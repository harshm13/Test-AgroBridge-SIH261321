Data Source: Always use the mandi_prices table from our SQLite database (agrobridge.db). Do not use any local CSV files.

Libraries: Use pandas, numpy, scikit-learn, xgboost, shap, joblib, and sqlalchemy. Do not introduce other major libraries without asking.

Code Style: All functions must have type hints and docstrings. Use Python's standard logging module for outputs, not print().

Data Integrity: Assume the following schema for mandi_prices: date (datetime), mandi_name (string), district (string), crop (string), min_price (float), max_price (float), modal_price (float), arrivals (float).

