import pandas as pd
import os

# --------------------------------------------------
# FILE PATHS
# --------------------------------------------------

INPUT_FILE = "../data-ingestion/normalized_security_data.csv"
OUTPUT_FILE = "risk_results.csv"


# --------------------------------------------------
# RISK SCORE CALCULATION
# --------------------------------------------------

def calculate_risk(row):

    # -----------------------------
    # 1. BUSINESS CRITICALITY
    # 1-5 converted to 0-100
    # -----------------------------

    criticality_score = (row["business_criticality"] / 5) * 100


    # -----------------------------
    # 2. VULNERABILITY SEVERITY
    # CVSS already ranges from 0-10
    # -----------------------------

    vulnerability_score = (row["max_cvss"] / 10) * 100


    # -----------------------------
    # 3. ACTIVE THREATS
    # Maximum expected threat count = 5
    # -----------------------------

    threat_score = min((row["active_threats"] / 5) * 100, 100)


    # -----------------------------
    # 4. INTERNET EXPOSURE
    # -----------------------------

    exposure_score = 100 if row["internet_exposed"] else 0


    # -----------------------------
    # 5. IAM RISK
    # -----------------------------

    iam_mapping = {
        "Low": 25,
        "Medium": 60,
        "High": 100
    }

    iam_score = iam_mapping.get(row["iam_risk"], 50)


    # -----------------------------
    # 6. EDR STATUS
    # -----------------------------

    edr_mapping = {
        "Protected": 20,
        "At Risk": 100
    }

    edr_score = edr_mapping.get(row["edr_status"], 50)


    # -----------------------------
    # 7. CONTROL WEAKNESS
    #
    # Control effectiveness:
    # 1 = 100% effective
    # 0 = completely ineffective
    #
    # Therefore weakness = 1 - effectiveness
    # -----------------------------

    control_weakness_score = (
        1 - row["control_effectiveness"]
    ) * 100


    # --------------------------------------------------
    # WEIGHTED RISK SCORE
    # --------------------------------------------------

    risk_score = (
        criticality_score * 0.20 +
        vulnerability_score * 0.20 +
        threat_score * 0.15 +
        exposure_score * 0.10 +
        iam_score * 0.10 +
        edr_score * 0.10 +
        control_weakness_score * 0.15
    )


    # Make sure score stays between 0 and 100

    risk_score = max(0, min(risk_score, 100))


    # --------------------------------------------------
    # RISK LEVEL
    # --------------------------------------------------

    if risk_score <= 25:
        risk_level = "Low"

    elif risk_score <= 50:
        risk_level = "Medium"

    elif risk_score <= 75:
        risk_level = "High"

    else:
        risk_level = "Critical"


    return round(risk_score, 2), risk_level


# --------------------------------------------------
# MAIN RISK ENGINE
# --------------------------------------------------

def run_risk_engine():

    print("Loading normalized security data...")

    if not os.path.exists(INPUT_FILE):
        print("ERROR: normalized_security_data.csv not found.")
        print("Run the Data Ingestion module first.")
        return

    df = pd.read_csv(INPUT_FILE)

    print(f"Records loaded: {len(df)}")


    # --------------------------------------------------
    # CALCULATE RISK FOR EVERY ASSET
    # --------------------------------------------------

    results = df.apply(calculate_risk, axis=1)

    df["risk_score"] = results.apply(lambda x: x[0])
    df["risk_level"] = results.apply(lambda x: x[1])


    # --------------------------------------------------
    # SORT BY HIGHEST RISK
    # --------------------------------------------------

    df = df.sort_values(
        by="risk_score",
        ascending=False
    )


    # --------------------------------------------------
    # SAVE RESULTS
    # --------------------------------------------------

    df.to_csv(OUTPUT_FILE, index=False)


    # --------------------------------------------------
    # SUMMARY
    # --------------------------------------------------

    print("\nRisk analysis completed successfully!")

    print(f"Total assets analyzed: {len(df)}")

    print("\nRisk Distribution:")

    print(
        df["risk_level"]
        .value_counts()
        .to_string()
    )

    print("\nHighest Risk Assets:")

    print(
        df[
            [
                "asset_id",
                "asset_name",
                "risk_score",
                "risk_level"
            ]
        ]
        .head(5)
        .to_string(index=False)
    )

    print(f"\nOutput file: {OUTPUT_FILE}")


# --------------------------------------------------
# RUN
# --------------------------------------------------

if __name__ == "__main__":
    run_risk_engine()