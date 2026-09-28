'''from fastapi import APIRouter
from data_loader import load_data
from services.risk_service import calculate_enterprise_risk

router = APIRouter()


@router.get("/api/dashboard")
def get_dashboard():
    df = load_data()

    risk = calculate_enterprise_risk(df)

    critical_assets = 0
    high_assets = 0
    medium_assets = 0
    low_assets = 0

    for _, row in df.iterrows():
        score = calculate_enterprise_risk(
            df.iloc[[_]]
        ) if False else None

    df["risk_score"] = df.apply(
        lambda row: __import__(
            "services.risk_service",
            fromlist=["calculate_asset_risk"]
        ).calculate_asset_risk(row)["risk_score"],
        axis=1
    )

    df["risk_level"] = df["risk_score"].apply(
        lambda score:
        "Critical" if score >= 75
        else "High" if score >= 50
        else "Medium" if score >= 25
        else "Low"
    )

    critical_assets = int((df["risk_level"] == "Critical").sum())
    high_assets = int((df["risk_level"] == "High").sum())
    medium_assets = int((df["risk_level"] == "Medium").sum())
    low_assets = int((df["risk_level"] == "Low").sum())

    highest_risk = df.loc[df["risk_score"].idxmax()]

    return {
        "risk_score": risk["risk_score"],
        "risk_level": risk["risk_level"],
        "total_assets": len(df),
        "total_vulnerabilities": int(df["vulnerability_count"].sum()),
        "critical_assets": critical_assets,
        "high_assets": high_assets,
        "medium_assets": medium_assets,
        "low_assets": low_assets,
        "highest_risk_asset": {
            "asset_id": highest_risk["asset_id"],
            "asset_name": highest_risk["asset_name"],
            "risk_score": float(highest_risk["risk_score"]),
            "risk_level": highest_risk["risk_level"]
        }
    }'''



from fastapi import APIRouter
from data_loader import load_data
from services.risk_service import (
    calculate_asset_risk,
    calculate_enterprise_risk
)

router = APIRouter()


@router.get("/api/dashboard")
def get_dashboard():
    df = load_data()

    risk = calculate_enterprise_risk(df)

    df["risk_score"] = df.apply(
        lambda row: calculate_asset_risk(row)["risk_score"],
        axis=1
    )

    df["risk_level"] = df["risk_score"].apply(
        lambda score:
        "Critical" if score >= 75
        else "High" if score >= 50
        else "Medium" if score >= 25
        else "Low"
    )

    critical_assets = int((df["risk_level"] == "Critical").sum())
    high_assets = int((df["risk_level"] == "High").sum())
    medium_assets = int((df["risk_level"] == "Medium").sum())
    low_assets = int((df["risk_level"] == "Low").sum())

    highest_risk = df.loc[df["risk_score"].idxmax()]

    return {
        "risk_score": risk["risk_score"],
        "risk_level": risk["risk_level"],
        "total_assets": len(df),
        "total_vulnerabilities": int(df["vulnerability_count"].sum()),
        "critical_assets": critical_assets,
        "high_assets": high_assets,
        "medium_assets": medium_assets,
        "low_assets": low_assets,
        "highest_risk_asset": {
            "asset_id": highest_risk["asset_id"],
            "asset_name": highest_risk["asset_name"],
            "risk_score": float(highest_risk["risk_score"]),
            "risk_level": highest_risk["risk_level"]
        }
    }