"""
Feature engineering pipeline for AgroBridge APMC mandi price forecasting.
Extracts chronological lag features, rolling statistics, calendar seasonality,
and festive demand indicators from the SQLite mandi_prices table.
"""

import logging
import os
from typing import Optional
import numpy as np
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine

# Configure standardized logging adhering to GEMINI.md rules
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

DEFAULT_DB_REL_PATH = "backend/db/agrobridge.db"


def get_db_engine(db_path: Optional[str] = None) -> Engine:
    """
    Creates and returns a SQLAlchemy Engine for the SQLite database.

    Args:
        db_path (Optional[str]): Absolute or relative path to agrobridge.db.
            If None, resolves relative to project root or ml module.

    Returns:
        Engine: SQLAlchemy database engine instance.
    """
    if db_path is None:
        # Resolve path dynamically whether run from root or ml directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.abspath(os.path.join(current_dir, ".."))
        db_candidate = os.path.join(backend_dir, "db", "agrobridge.db")
        if os.path.exists(db_candidate):
            db_path = db_candidate
        else:
            db_path = os.path.abspath(DEFAULT_DB_REL_PATH)

    logger.info("Initializing SQLAlchemy database connection to: %s", db_path)
    return create_engine(f"sqlite:///{db_path}", echo=False)


def load_mandi_prices(engine: Engine) -> pd.DataFrame:
    """
    Loads raw mandi price records from the mandi_prices table in SQLite.

    Args:
        engine (Engine): Active SQLAlchemy database engine.

    Returns:
        pd.DataFrame: Raw mandi records with columns date, mandi_name, district,
            crop, min_price, max_price, modal_price, arrivals.
    """
    query = """
        SELECT 
            date, 
            mandi_name, 
            district, 
            crop, 
            min_price, 
            max_price, 
            modal_price, 
            arrivals 
        FROM mandi_prices
        ORDER BY crop, district, mandi_name, date ASC
    """
    logger.info("Executing query to load records from mandi_prices table...")
    df = pd.read_sql_query(query, con=engine)
    logger.info("Successfully fetched %d raw price records from mandi_prices.", len(df))
    return df


def compute_festival_season_flag(date_series: pd.Series) -> pd.Series:
    """
    Calculates binary flag indicating major agricultural/cultural festival season in Maharashtra.
    Periods included:
    - Gudi Padwa & Akshaya Tritiya (March - April / Month 3 & 4)
    - Ganesh Chaturthi, Navratri, Dussehra, Diwali (August - November / Months 8, 9, 10, 11)

    Args:
        date_series (pd.Series): Series of datetime objects.

    Returns:
        pd.Series: Integer series where 1 indicates festival season and 0 otherwise.
    """
    months = date_series.dt.month
    is_festival = months.isin([3, 4, 8, 9, 10, 11]).astype(int)
    return is_festival


def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Engineers time-series lag features, rolling statistics, calendar indicators,
    and target labels for 7-day and 14-day price forecasting.

    Args:
        df (pd.DataFrame): Raw dataframe loaded from mandi_prices.

    Returns:
        pd.DataFrame: Processed dataframe ready for model training and inference.
    """
    logger.info("Starting feature engineering on %d records...", len(df))
    
    # 1. Clean and normalize data types
    df = df.copy()
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df = df.dropna(subset=["date", "crop", "district", "modal_price"])
    df["crop"] = df["crop"].astype(str).str.lower().str.strip()
    df["district"] = df["district"].astype(str).str.strip()
    df["mandi_name"] = df["mandi_name"].astype(str).str.strip()
    
    for num_col in ["min_price", "max_price", "modal_price", "arrivals"]:
        df[num_col] = pd.to_numeric(df[num_col], errors="coerce")

    # Sort strictly chronologically for grouping
    df = df.sort_values(by=["crop", "district", "mandi_name", "date"]).reset_index(drop=True)

    # 2. Extract Calendar & Seasonality features
    df["month"] = df["date"].dt.month
    df["week"] = df["date"].dt.isocalendar().week.astype(int)
    df["day_of_week"] = df["date"].dt.dayofweek
    df["day_of_year"] = df["date"].dt.dayofyear
    df["festival_season"] = compute_festival_season_flag(df["date"])

    # 3. Group-wise Lag & Rolling Features
    # Group by crop, district, and mandi_name to avoid cross-market contamination
    group_cols = ["crop", "district", "mandi_name"]
    grouped = df.groupby(group_cols, group_keys=False)

    logger.info("Calculating lag features: 1-day, 7-day, 14-day...")
    df["modal_price_lag_1"] = grouped["modal_price"].shift(1)
    df["modal_price_lag_7"] = grouped["modal_price"].shift(7)
    df["modal_price_lag_14"] = grouped["modal_price"].shift(14)
    df["arrivals_lag_1"] = grouped["arrivals"].shift(1)

    logger.info("Calculating rolling statistics: 7-day and 30-day means...")
    # Using shift(1) prior to rolling ensures no target leakage from current day's price
    df["rolling_mean_7"] = grouped["modal_price"].apply(
        lambda s: s.shift(1).rolling(window=7, min_periods=1).mean()
    )
    df["rolling_mean_30"] = grouped["modal_price"].apply(
        lambda s: s.shift(1).rolling(window=30, min_periods=1).mean()
    )
    df["rolling_std_7"] = grouped["modal_price"].apply(
        lambda s: s.shift(1).rolling(window=7, min_periods=1).std().fillna(0.0)
    )

    # Price momentum and spread indicators
    df["price_spread"] = df["max_price"] - df["min_price"]
    df["price_to_rolling_mean_7_ratio"] = (
        df["modal_price_lag_1"] / df["rolling_mean_7"].replace(0, np.nan)
    ).fillna(1.0)

    # 4. Supervised Forecasting Targets (Shifted backwards chronologically)
    logger.info("Creating forward target labels for 7-day and 14-day horizons...")
    df["target_7d"] = grouped["modal_price"].shift(-7)
    df["target_14d"] = grouped["modal_price"].shift(-14)

    # Clean intermediate NaNs in lag features using backfill within group or group mean
    df["modal_price_lag_1"] = df["modal_price_lag_1"].fillna(df["modal_price"])
    df["modal_price_lag_7"] = df["modal_price_lag_7"].fillna(df["modal_price_lag_1"])
    df["modal_price_lag_14"] = df["modal_price_lag_14"].fillna(df["modal_price_lag_7"])
    df["arrivals_lag_1"] = df["arrivals_lag_1"].fillna(df["arrivals"])
    df["rolling_mean_7"] = df["rolling_mean_7"].fillna(df["modal_price"])
    df["rolling_mean_30"] = df["rolling_mean_30"].fillna(df["rolling_mean_7"])

    # Drop records where training targets cannot be evaluated
    clean_df = df.dropna(subset=["target_7d", "target_14d"]).reset_index(drop=True)
    logger.info(
        "Feature engineering complete. Retained %d supervised training instances across %d crops.",
        len(clean_df),
        clean_df["crop"].nunique()
    )
    return clean_df


def save_processed_prices(df: pd.DataFrame, engine: Engine, table_name: str = "processed_prices") -> None:
    """
    Persists the engineered dataset to the processed_prices table in SQLite.

    Args:
        df (pd.DataFrame): Processed dataframe with features and targets.
        engine (Engine): SQLAlchemy database engine.
        table_name (str): Target table name, default 'processed_prices'.
    """
    logger.info("Saving %d processed rows into SQLite table '%s'...", len(df), table_name)
    df.to_sql(table_name, con=engine, if_exists="replace", index=False)
    logger.info("Successfully updated table '%s' in agrobridge.db.", table_name)


def run_pipeline() -> pd.DataFrame:
    """
    Executes the end-to-end /prepare-data feature engineering pipeline.

    Returns:
        pd.DataFrame: Final processed dataset stored in SQLite.
    """
    logger.info("=== Starting AgroBridge /prepare-data Workflow ===")
    engine = get_db_engine()
    raw_df = load_mandi_prices(engine=engine)
    processed_df = engineer_features(df=raw_df)
    save_processed_prices(df=processed_df, engine=engine)
    logger.info("=== AgroBridge /prepare-data Completed Successfully ===")
    return processed_df


if __name__ == "__main__":
    run_pipeline()
