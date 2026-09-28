def calculate_asset_risk(row):
    criticality = row["business_criticality"] / 5
    internet_exposure = 1 if row["internet_exposed"] else 0
    cvss = row["max_cvss"] / 10
    vulnerabilities = min(row["vulnerability_count"] / 8, 1)
    threats = min(row["active_threats"] / 4, 1)

    edr_risk = 1 if row["edr_status"] == "At Risk" else 0

    iam_risk_map = {
        "High": 1,
        "Medium": 0.5,
        "Low": 0
    }
    iam_risk = iam_risk_map.get(row["iam_risk"], 0)

    control_weakness = 1 - row["control_effectiveness"]

    raw_score = (
        0.20 * criticality +
        0.15 * internet_exposure +
        0.20 * cvss +
        0.15 * vulnerabilities +
        0.15 * threats +
        0.05 * edr_risk +
        0.05 * iam_risk +
        0.05 * control_weakness
    )

    risk_score = round(raw_score * 100, 2)

    if risk_score >= 75:
        risk_level = "Critical"
    elif risk_score >= 50:
        risk_level = "High"
    elif risk_score >= 25:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level
    }

def calculate_enterprise_risk(df):
    df = df.copy()

    df["risk_score"] = df.apply(
        lambda row: calculate_asset_risk(row)["risk_score"],
        axis=1
    )

    total_criticality = df["business_criticality"].sum()

    enterprise_risk = (
        (df["risk_score"] * df["business_criticality"]).sum()
        / total_criticality
    )

    enterprise_risk = round(float(enterprise_risk), 2)

    if enterprise_risk >= 75:
        risk_level = "Critical"
    elif enterprise_risk >= 50:
        risk_level = "High"
    elif enterprise_risk >= 25:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "risk_score": enterprise_risk,
        "risk_level": risk_level,
        "total_assets": len(df)
    }