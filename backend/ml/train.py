"""
Model training and evaluation pipeline for AgroBridge APMC price forecasting.
Trains multi-horizon XGBoost Regressors for 7-day and 14-day price predictions,
evaluates chronological test splits using RMSE & MAPE, and exports model artifacts
and TreeSHAP explainers to ml/models/.
"""

import logging
import os
from typing import Any, Dict, List, Optional, Tuple
import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import LabelEncoder
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
import xgboost as xgb
import shap

# Configure standardized logging adhering to GEMINI.md rules
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

DEFAULT_DB_REL_PATH = "backend/db/agrobridge.db"
DEFAULT_MODELS_DIR = "backend/ml/models"


def get_db_engine(db_path: Optional[str] = None) -> Engine:
    """
    Creates and returns a SQLAlchemy Engine for the SQLite database.

    Args:
        db_path (Optional[str]): Absolute or relative path to agrobridge.db.

    Returns:
        Engine: SQLAlchemy database engine instance.
    """
    if db_path is None:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.abspath(os.path.join(current_dir, ".."))
        db_candidate = os.path.join(backend_dir, "db", "agrobridge.db")
        db_path = db_candidate if os.path.exists(db_candidate) else os.path.abspath(DEFAULT_DB_REL_PATH)

    logger.info("Connecting to database at: %s", db_path)
    return create_engine(f"sqlite:///{db_path}", echo=False)


def load_processed_data(engine: Engine) -> pd.DataFrame:
    """
    Loads feature-engineered dataset from processed_prices table in SQLite.

    Args:
        engine (Engine): SQLAlchemy database engine.

    Returns:
        pd.DataFrame: Processed dataset sorted chronologically.
    """
    query = "SELECT * FROM processed_prices ORDER BY date ASC"
    logger.info("Loading feature-engineered data from processed_prices table...")
    df = pd.read_sql_query(query, con=engine)
    logger.info("Loaded %d rows from processed_prices.", len(df))
    return df


def calculate_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Tuple[float, float]:
    """
    Calculates Root Mean Squared Error (RMSE) and Mean Absolute Percentage Error (MAPE).

    Args:
        y_true (np.ndarray): Actual market prices.
        y_pred (np.ndarray): Model predicted prices.

    Returns:
        Tuple[float, float]: (RMSE in Rs/Quintal, MAPE as percentage).
    """
    rmse = float(np.sqrt(mean_squared_error(y_true, y_pred)))
    # Avoid division by zero in MAPE calculation
    non_zero_mask = y_true > 0
    if np.any(non_zero_mask):
        mape = float(np.mean(np.abs((y_true[non_zero_mask] - y_pred[non_zero_mask]) / y_true[non_zero_mask])) * 100.0)
    else:
        mape = 0.0
    return rmse, mape


def prepare_features(
    df: pd.DataFrame
) -> Tuple[pd.DataFrame, pd.Series, pd.Series, Dict[str, LabelEncoder], List[str]]:
    """
    Encodes categorical columns and extracts feature matrices and multi-horizon target vectors.

    Args:
        df (pd.DataFrame): Processed dataframe from processed_prices.

    Returns:
        Tuple containing:
            - X (pd.DataFrame): Engineered feature matrix.
            - y_7d (pd.Series): 7-day ahead price targets.
            - y_14d (pd.Series): 14-day ahead price targets.
            - encoders (Dict[str, LabelEncoder]): Encoders for categorical features.
            - feature_cols (List[str]): List of ordered feature column names.
    """
    data = df.copy()
    data["date"] = pd.to_datetime(data["date"])
    data = data.sort_values(by="date").reset_index(drop=True)

    encoders: Dict[str, LabelEncoder] = {}
    for col in ["crop", "district"]:
        le = LabelEncoder()
        data[f"{col}_encoded"] = le.fit_transform(data[col].astype(str).str.lower().str.strip())
        encoders[col] = le
        logger.info("Encoded column '%s' with %d unique categories.", col, len(le.classes_))

    feature_cols = [
        "crop_encoded",
        "district_encoded",
        "modal_price",
        "modal_price_lag_1",
        "modal_price_lag_7",
        "modal_price_lag_14",
        "arrivals",
        "arrivals_lag_1",
        "rolling_mean_7",
        "rolling_mean_30",
        "rolling_std_7",
        "price_spread",
        "price_to_rolling_mean_7_ratio",
        "month",
        "week",
        "day_of_week",
        "festival_season"
    ]

    X = data[feature_cols].copy().fillna(0.0)
    y_7d = data["target_7d"].astype(float)
    y_14d = data["target_14d"].astype(float)

    return X, y_7d, y_14d, encoders, feature_cols


def chronological_split(
    X: pd.DataFrame,
    y: pd.Series,
    test_ratio: float = 0.20
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series]:
    """
    Splits data chronologically without shuffling to prevent temporal lookahead bias.

    Args:
        X (pd.DataFrame): Feature matrix sorted by time.
        y (pd.Series): Target vector.
        test_ratio (float): Ratio of most recent data reserved for testing. Default 0.20.

    Returns:
        Tuple of (X_train, X_test, y_train, y_test).
    """
    split_idx = int(len(X) * (1.0 - test_ratio))
    X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
    y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
    logger.info(
        "Chronological split performed: Train=%d samples (80%%), Test=%d samples (20%%).",
        len(X_train),
        len(X_test)
    )
    return X_train, X_test, y_train, y_test


def train_xgboost_regressor(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    horizon_name: str
) -> xgb.XGBRegressor:
    """
    Trains an XGBoost Regressor configured for agricultural price time-series regression.

    Args:
        X_train (pd.DataFrame): Training feature matrix.
        y_train (pd.Series): Target prices for the horizon.
        horizon_name (str): Descriptive horizon label (e.g. '7-day', '14-day').

    Returns:
        xgb.XGBRegressor: Fitted XGBoost Regressor.
    """
    logger.info("Training XGBoost Regressor for %s forecasting...", horizon_name)
    model = xgb.XGBRegressor(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.85,
        colsample_bytree=0.85,
        random_state=42,
        n_jobs=-1,
        tree_method="hist"
    )
    model.fit(X_train, y_train)
    logger.info("Successfully trained %s XGBoost model.", horizon_name)
    return model


def evaluate_model(
    model: xgb.XGBRegressor,
    X_test: pd.DataFrame,
    y_test: pd.Series,
    horizon_name: str
) -> Tuple[float, float]:
    """
    Generates test predictions and logs RMSE and MAPE evaluation metrics.

    Args:
        model (xgb.XGBRegressor): Fitted model.
        X_test (pd.DataFrame): Test feature set.
        y_test (pd.Series): Actual test targets.
        horizon_name (str): Descriptive horizon label.

    Returns:
        Tuple[float, float]: (RMSE, MAPE).
    """
    y_pred = model.predict(X_test)
    rmse, mape = calculate_metrics(y_test.to_numpy(), y_pred)
    logger.info(
        "=== Evaluation Results for %s Forecast === RMSE: Rs %.2f/Qtl | MAPE: %.2f%%",
        horizon_name,
        rmse,
        mape
    )
    return rmse, mape


def save_artifacts(
    model_7d: xgb.XGBRegressor,
    model_14d: xgb.XGBRegressor,
    explainer_14d: shap.TreeExplainer,
    encoders: Dict[str, LabelEncoder],
    feature_cols: List[str],
    metrics: Dict[str, Dict[str, float]],
    output_dir: Optional[str] = None
) -> str:
    """
    Serializes models, SHAP explainer, encoders, and feature schema to disk using joblib.

    Args:
        model_7d (xgb.XGBRegressor): Trained 7-day model.
        model_14d (xgb.XGBRegressor): Trained 14-day model.
        explainer_14d (shap.TreeExplainer): TreeSHAP explainer for 14-day model.
        encoders (Dict[str, LabelEncoder]): Encoders for categorical features.
        feature_cols (List[str]): List of feature column names.
        metrics (Dict[str, Dict[str, float]]): Computed test metrics.
        output_dir (Optional[str]): Destination directory for artifacts.

    Returns:
        str: Absolute path to output directory.
    """
    if output_dir is None:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        output_dir = os.path.join(current_dir, "models")

    os.makedirs(output_dir, exist_ok=True)
    logger.info("Saving ML artifacts and SHAP explainer to directory: %s", output_dir)

    # Save individual components
    joblib.dump(model_7d, os.path.join(output_dir, "model_7d.joblib"))
    joblib.dump(model_14d, os.path.join(output_dir, "model_14d.joblib"))
    joblib.dump(explainer_14d, os.path.join(output_dir, "shap_explainer_14d.joblib"))
    joblib.dump(encoders, os.path.join(output_dir, "label_encoders.joblib"))
    joblib.dump(feature_cols, os.path.join(output_dir, "feature_columns.joblib"))
    joblib.dump(metrics, os.path.join(output_dir, "model_metrics.joblib"))

    # Also save unified package for fast atomic loading in FastAPI
    unified_bundle = {
        "model_7d": model_7d,
        "model_14d": model_14d,
        "explainer_14d": explainer_14d,
        "encoders": encoders,
        "feature_cols": feature_cols,
        "metrics": metrics
    }
    joblib.dump(unified_bundle, os.path.join(output_dir, "agrobridge_pipeline.joblib"))

    logger.info("Successfully persisted all model and explainer artifacts to %s.", output_dir)
    return output_dir


def run_training() -> Dict[str, Any]:
    """
    Executes the end-to-end /train-model training, evaluation, and artifact export workflow.

    Returns:
        Dict[str, Any]: Summary dictionary containing evaluation metrics and saved paths.
    """
    logger.info("=== Starting AgroBridge /train-model Workflow ===")
    engine = get_db_engine()
    df = load_processed_data(engine=engine)
    X, y_7d, y_14d, encoders, feature_cols = prepare_features(df=df)

    # Chronological split for both horizons
    X_train_7d, X_test_7d, y_train_7d, y_test_7d = chronological_split(X, y_7d, test_ratio=0.20)
    X_train_14d, X_test_14d, y_train_14d, y_test_14d = chronological_split(X, y_14d, test_ratio=0.20)

    # Train 7-day horizon model
    model_7d = train_xgboost_regressor(X_train_7d, y_train_7d, horizon_name="7-Day")
    rmse_7d, mape_7d = evaluate_model(model_7d, X_test_7d, y_test_7d, horizon_name="7-Day")

    # Train 14-day horizon model
    model_14d = train_xgboost_regressor(X_train_14d, y_train_14d, horizon_name="14-Day")
    rmse_14d, mape_14d = evaluate_model(model_14d, X_test_14d, y_test_14d, horizon_name="14-Day")

    # Build TreeSHAP explainer on 14-day model
    logger.info("Fitting SHAP TreeExplainer for 14-day model interpretability...")
    explainer_14d = shap.TreeExplainer(model_14d, feature_perturbation="tree_path_dependent")
    logger.info("SHAP TreeExplainer initialized successfully.")

    metrics = {
        "7_day": {"rmse": rmse_7d, "mape": mape_7d},
        "14_day": {"rmse": rmse_14d, "mape": mape_14d}
    }

    out_dir = save_artifacts(
        model_7d=model_7d,
        model_14d=model_14d,
        explainer_14d=explainer_14d,
        encoders=encoders,
        feature_cols=feature_cols,
        metrics=metrics
    )

    logger.info("=== AgroBridge /train-model Completed Successfully ===")
    return {"metrics": metrics, "output_directory": out_dir}


if __name__ == "__main__":
    run_training()