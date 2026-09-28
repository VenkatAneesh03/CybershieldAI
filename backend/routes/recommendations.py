from fastapi import APIRouter
from data_loader import load_data
from services.risk_service import calculate_asset_risk

router = APIRouter()


@router.get("/api/recommendations")
def get_recommendations():
    df = load_data()

    recommendations = []

    for _, row in df.iterrows():
        risk = calculate_asset_risk(row)

        score = float(risk["risk_score"])

        # Critical risk
        if score >= 75:
            priority = "Critical"
        elif score >= 50:
            priority = "High"
        else:
            priority = "Medium"

        # Vulnerability recommendation
        if row["max_cvss"] >= 9.0:
            recommendations.append({
                "asset_id": row["asset_id"],
                "asset_name": row["asset_name"],
                "priority": priority,
                "recommendation": "Immediately patch critical vulnerabilities",
                "reason": f"Maximum CVSS is {row['max_cvss']}",
                "risk_score": score
            })

        elif row["vulnerability_count"] >= 5:
            recommendations.append({
                "asset_id": row["asset_id"],
                "asset_name": row["asset_name"],
                "priority": priority,
                "recommendation": "Prioritize vulnerability remediation",
                "reason": f"{int(row['vulnerability_count'])} vulnerabilities detected",
                "risk_score": score
            })

        # EDR recommendation
        if row["edr_status"] == "At Risk":
            recommendations.append({
                "asset_id": row["asset_id"],
                "asset_name": row["asset_name"],
                "priority": priority,
                "recommendation": "Improve endpoint detection and response protection",
                "reason": "EDR status is At Risk",
                "risk_score": score
            })

        # IAM recommendation
        if row["iam_risk"] == "High":
            recommendations.append({
                "asset_id": row["asset_id"],
                "asset_name": row["asset_name"],
                "priority": priority,
                "recommendation": "Strengthen IAM controls and privileged access",
                "reason": "IAM risk is High",
                "risk_score": score
            })

        # Control effectiveness recommendation
        if row["control_effectiveness"] < 0.60:
            recommendations.append({
                "asset_id": row["asset_id"],
                "asset_name": row["asset_name"],
                "priority": priority,
                "recommendation": "Improve security control effectiveness",
                "reason": f"Control effectiveness is {row['control_effectiveness']}",
                "risk_score": score
            })

        # Internet exposure recommendation
        if row["internet_exposed"] and row["active_threats"] >= 3:
            recommendations.append({
                "asset_id": row["asset_id"],
                "asset_name": row["asset_name"],
                "priority": priority,
                "recommendation": "Strengthen internet-facing security controls",
                "reason": "Internet exposed with 3 or more active threats",
                "risk_score": score
            })

    recommendations.sort(
        key=lambda x: x["risk_score"],
        reverse=True
    )

    return {
        "total_recommendations": len(recommendations),
        "recommendations": recommendations
    }