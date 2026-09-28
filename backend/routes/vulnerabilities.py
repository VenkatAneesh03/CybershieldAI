from fastapi import APIRouter
from data_loader import load_data
from services.risk_service import calculate_asset_risk

router = APIRouter()


@router.get("/api/vulnerabilities")
def get_vulnerabilities():
    df = load_data()

    assets = []

    for _, row in df.iterrows():
        risk = calculate_asset_risk(row)

        if row["max_cvss"] >= 9.0:
            severity = "Critical"
        elif row["max_cvss"] >= 7.0:
            severity = "High"
        elif row["max_cvss"] >= 4.0:
            severity = "Medium"
        else:
            severity = "Low"

        assets.append({
            "asset_id": row["asset_id"],
            "asset_name": row["asset_name"],
            "asset_type": row["asset_type"],
            "vulnerability_count": int(row["vulnerability_count"]),
            "max_cvss": float(row["max_cvss"]),
            "severity": severity,
            "business_criticality": int(row["business_criticality"]),
            "internet_exposed": bool(row["internet_exposed"]),
            "active_threats": int(row["active_threats"]),
            "edr_status": row["edr_status"],
            "iam_risk": row["iam_risk"],
            "control_effectiveness": float(row["control_effectiveness"]),
            "risk_score": float(risk["risk_score"]),
            "risk_level": risk["risk_level"]
        })

    return {
        "total_assets": len(assets),
        "total_vulnerabilities": int(df["vulnerability_count"].sum()),
        "assets": assets
    }