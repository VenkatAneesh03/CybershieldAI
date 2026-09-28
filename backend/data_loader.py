import pandas as pd

CSV_FILE = "enterprise_security_data.csv"


def load_data():
    df = pd.read_csv(CSV_FILE)
    return df