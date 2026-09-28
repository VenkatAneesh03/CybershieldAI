'''from fastapi import APIRouter, Query
from data_loader import load_data
from services.risk_service import calculate_asset_risk

router = APIRouter()


def calculate_enterprise_score(df):
    scores = df.apply(
        lambda row: calculate_asset_risk(row)["risk_score"],
        axis=1
    )

    return (
        (scores * df["business_criticality"]).sum()
        / df["business_criticality"].sum()
    )


@router.get("/api/investment")
def get_investment(
    budget: float = Query(100000, gt=0)
):
    df = load_data()

    current_risk = calculate_enterprise_score(df)
    opportunities = []

    for index, row in df.iterrows():

        actions = []

        if row["max_cvss"] >= 9.0 or row["vulnerability_count"] >= 5:
            actions.append({
                "action": "Vulnerability Patching",
                "cost": 5000,
                "changes": {
                    "vulnerability_count": max(0, int(row["vulnerability_count"]) // 2),
                    "max_cvss": max(0, float(row["max_cvss"]) - 2.0)
                }
            })

        if row["edr_status"] == "At Risk":
            actions.append({
                "action": "EDR Improvement",
                "cost": 8000,
                "changes": {
                    "edr_status": "Protected"
                }
            })

        if row["iam_risk"] == "High":
            actions.append({
                "action": "IAM Hardening",
                "cost": 6000,
                "changes": {
                    "iam_risk": "Low"
                }
            })

        if row["control_effectiveness"] < 0.60:
            actions.append({
                "action": "Security Control Improvement",
                "cost": 7000,
                "changes": {
                    "control_effectiveness": 0.85
                }
            })

        if row["internet_exposed"] and row["active_threats"] >= 3:
            actions.append({
                "action": "Internet Exposure Protection",
                "cost": 5000,
                "changes": {
                    "internet_exposed": False
                }
            })

        for action in actions:
            modified_df = df.copy()

            for column, value in action["changes"].items():
                modified_df.loc[index, column] = value

            new_risk = calculate_enterprise_score(modified_df)

            risk_reduction = max(0, current_risk - new_risk)

            if risk_reduction > 0:
                efficiency = risk_reduction / action["cost"]

                opportunities.append({
                    "asset_id": row["asset_id"],
                    "asset_name": row["asset_name"],
                    "current_risk_score": round(
                        float(calculate_asset_risk(row)["risk_score"]), 2
                    ),
                    "action": action["action"],
                    "estimated_cost": action["cost"],
                    "enterprise_risk_reduction": round(
                        float(risk_reduction), 2
                    ),
                    "risk_reduction_per_rupee": round(
                        float(efficiency), 6
                    )
                })

    opportunities.sort(
        key=lambda x: x["risk_reduction_per_rupee"],
        reverse=True
    )

    selected = []
    remaining_budget = budget
    total_cost = 0

    for opportunity in opportunities:
        if opportunity["estimated_cost"] <= remaining_budget:
            selected.append(opportunity)
            remaining_budget -= opportunity["estimated_cost"]
            total_cost += opportunity["estimated_cost"]

    final_df = df.copy()

    for selected_action in selected:
        asset_id = selected_action["asset_id"]

        index = final_df.index[
            final_df["asset_id"] == asset_id
        ][0]

        row = final_df.loc[index]

        if selected_action["action"] == "Vulnerability Patching":
            final_df.loc[index, "vulnerability_count"] = max(
                0, int(row["vulnerability_count"]) // 2
            )
            final_df.loc[index, "max_cvss"] = max(
                0, float(row["max_cvss"]) - 2.0
            )

        elif selected_action["action"] == "EDR Improvement":
            final_df.loc[index, "edr_status"] = "Protected"

        elif selected_action["action"] == "IAM Hardening":
            final_df.loc[index, "iam_risk"] = "Low"

        elif selected_action["action"] == "Security Control Improvement":
            final_df.loc[index, "control_effectiveness"] = 0.85

        elif selected_action["action"] == "Internet Exposure Protection":
            final_df.loc[index, "internet_exposed"] = False

    final_risk = calculate_enterprise_score(final_df)

    total_risk_reduction = max(
        0,
        current_risk - final_risk
    )

    roi = (
        total_risk_reduction / total_cost
        if total_cost > 0
        else 0
    )

    return {
        "budget": budget,
        "initial_risk_score": round(float(current_risk), 2),
        "final_risk_score": round(float(final_risk), 2),
        "recommended_investment": total_cost,
        "remaining_budget": round(float(remaining_budget), 2),
        "expected_risk_reduction": round(
            float(total_risk_reduction), 2
        ),
        "roi": round(float(roi), 6),
        "recommended_actions": selected
    }'''

from fastapi import APIRouter, Query
from data_loader import load_data
from services.investment_service import optimize_investment

router = APIRouter()


@router.get("/api/investment")
def get_investment(
    budget: float = Query(..., gt=0)
):
    df = load_data()

    result = optimize_investment(df, budget)

    return result