import pandas as pd
import json

INPUT_FILE = "enterprise_security_data.csv"
OUTPUT_FILE = "normalized_security_data.csv"
SUMMARY_FILE = "ingestion_summary.json"


def ingest_data():
    print("Loading enterprise security data...")

    df = pd.read_csv(INPUT_FILE)

    print(f"Records loaded: {len(df)}")

    required_columns = [
        "asset_id",
        "asset_name",
        "asset_type",
        "business_criticality",
        "internet_exposed",
        "vulnerability_count",
        "max_cvss",
        "active_threats",
        "edr_status",
        "iam_risk",
        "control_effectiveness"
    ]

    # Check required columns
    missing_columns = [
        column for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        print("ERROR: Missing columns:")
        print(missing_columns)
        return

    # Remove duplicate assets
    df = df.drop_duplicates(subset=["asset_id"])

    # Convert numeric columns
    numeric_columns = [
        "business_criticality",
        "vulnerability_count",
        "max_cvss",
        "active_threats",
        "control_effectiveness"
    ]

    for column in numeric_columns:
        df[column] = pd.to_numeric(df[column], errors="coerce")

    # Remove rows with important missing values
    df = df.dropna(subset=[
        "asset_id",
        "business_criticality",
        "max_cvss"
    ])

    # Normalize boolean values
    df["internet_exposed"] = (
        df["internet_exposed"]
        .astype(str)
        .str.lower()
        .map({
            "true": True,
            "false": False
        })
    )

    # Normalize text
    df["edr_status"] = (
        df["edr_status"]
        .astype(str)
        .str.strip()
        .str.title()
    )

    df["iam_risk"] = (
        df["iam_risk"]
        .astype(str)
        .str.strip()
        .str.title()
    )

    # Keep CVSS between 0 and 10
    df["max_cvss"] = df["max_cvss"].clip(0, 10)

    # Keep control effectiveness between 0 and 1
    df["control_effectiveness"] = (
        df["control_effectiveness"].clip(0, 1)
    )

    # Save normalized data
    df.to_csv(OUTPUT_FILE, index=False)

    # Create ingestion summary
    summary = {
        "total_assets": len(df),

        "critical_assets": int(
            (df["business_criticality"] >= 4).sum()
        ),

        "internet_exposed_assets": int(
            df["internet_exposed"].sum()
        ),

        "high_cvss_assets": int(
            (df["max_cvss"] >= 7).sum()
        ),

        "active_threat_assets": int(
            (df["active_threats"] > 0).sum()
        ),

        "edr_at_risk_assets": int(
            (df["edr_status"].str.lower() == "at risk").sum()
        ),

        "average_control_effectiveness": round(
            df["control_effectiveness"].mean(), 2
        )
    }

    # Save summary JSON
    with open(SUMMARY_FILE, "w") as file:
        json.dump(summary, file, indent=4)

    print("\nData ingestion completed successfully!")
    print(f"Clean records: {len(df)}")
    print(f"Output file: {OUTPUT_FILE}")
    print(f"Summary generated: {SUMMARY_FILE}")


if __name__ == "__main__":
    ingest_data()