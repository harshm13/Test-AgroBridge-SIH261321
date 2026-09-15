---
description: Load mandi price data from SQLite agrobridge.db, engineer lag and rolling features, and save to processed_prices table
---

# Workflow: /prepare-data

This workflow executes feature engineering on historical APMC mandi prices stored in the SQLite database.

## Prerequisites
- SQLite database `backend/db/agrobridge.db` containing `mandi_prices` table.
- Python virtual environment with pandas, numpy, sqlalchemy, and scikit-learn.

## Execution Steps
1. Run `ml/features.py` from the `backend/` directory:
```bash
cd backend
./venv/bin/python ml/features.py
```

2. The script performs:
   - Connects to `sqlite:///./db/agrobridge.db` using SQLAlchemy.
   - Queries `mandi_prices` table (columns: `date`, `mandi_name`, `district`, `crop`, `min_price`, `max_price`, `modal_price`, `arrivals`).
   - Sorts records chronologically by `[crop, district, mandi_name, date]`.
   - Generates lag features: `lag_1`, `lag_7`, `lag_14`.
   - Generates rolling means and standard deviations: `rolling_mean_7`, `rolling_mean_30`, `rolling_std_7`.
   - Extracts temporal features: `month`, `week_of_year`, `day_of_week`.
   - Generates `festival_season` binary indicator (Maharashtra festival periods: Ganesh Chaturthi, Navratri, Diwali).
   - Generates forecast targets: `target_7d` and `target_14d`.
   - Drops NaN rows resulting from windowing operations.
   - Saves processed DataFrame to `processed_prices` table in `agrobridge.db`.
