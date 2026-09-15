---
description: Train multi-horizon XGBoost Regressors for 7-day and 14-day price forecasting, evaluate RMSE & MAPE, and generate SHAP explainers
---

# Workflow: /train-model

This workflow trains and evaluates XGBoost regression models on the `processed_prices` table in `agrobridge.db`, and saves the model artifacts and SHAP explainers to `ml/models/`.

## Prerequisites
- Completed execution of `/prepare-data` workflow so `processed_prices` table exists in `agrobridge.db`.
- Installed libraries: `xgboost`, `shap`, `joblib`, `scikit-learn`, `pandas`, `sqlalchemy`.

## Execution Steps
1. Run `ml/train.py` from the `backend/` directory:
```bash
cd backend
./venv/bin/python ml/train.py
```

2. The script performs:
   - Reads feature dataset from `processed_prices` table in `agrobridge.db` using SQLAlchemy.
   - Encodes categorical columns (`crop`, `district`, `mandi_name`).
   - Executes a chronological time-series split (training on past records, testing on recent records).
   - Trains two XGBoost models:
     * Model 7d: Predicts modal price 7 days ahead.
     * Model 14d: Predicts modal price 14 days ahead.
   - Evaluates test predictions, computing and logging:
     * Root Mean Squared Error (RMSE)
     * Mean Absolute Percentage Error (MAPE)
   - Fits a TreeSHAP explainer (`shap.TreeExplainer`) on the trained model.
   - Saves model pipeline, encoders, and SHAP explainer to `backend/ml/models/`.
