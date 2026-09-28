from services.risk_service import calculate_asset_risk


def optimize_investment(df, budget):
    df = df.copy()

    recommendations = []

    for _, row in df.iterrows():
        risk = calculate_asset_risk(row)

        risk_score = float(risk["risk_score"])

        # Estimate remediation effort from actual asset conditions
        action_count = 0
        actions = []

        if row["vulnerability_count"] > 0:
            action_count += 1
            actions.append("Vulnerability Remediation")

        if row["edr_status"] == "At Risk":
            action_count += 1
            actions.append("EDR Improvement")

        if row["iam_risk"] == "High":
            action_count += 1
            actions.append("IAM Hardening")

        if row["control_effectiveness"] < 0.60:
            action_count += 1
            actions.append("Security Control Improvement")

        if row["internet_exposed"] and row["max_cvss"] >= 9:
            action_count += 1
            actions.append("Internet-Facing Protection")

        if action_count == 0:
            continue

        estimated_cost = (
            row["vulnerability_count"] * 1000
            + (5000 if row["edr_status"] == "At Risk" else 0)
            + (4000 if row["iam_risk"] == "High" else 0)
            + ((1 - row["control_effectiveness"]) * 10000)
        )

        estimated_cost = round(float(estimated_cost), 2)

        estimated_risk_reduction = round(
            min(
                risk_score * 0.45,
                10 + action_count * 8
            ),
            2
        )

        roi = round(
            estimated_risk_reduction / (estimated_cost / 1000),
            4
        )

        recommendations.append({
            "asset_id": row["asset_id"],
            "asset_name": row["asset_name"],
            "risk_score": risk_score,
            "risk_level": risk["risk_level"],
            "recommended_actions": actions,
            "estimated_cost": estimated_cost,
            "estimated_risk_reduction": estimated_risk_reduction,
            "roi": roi
        })

    recommendations.sort(
        key=lambda x: x["roi"],
        reverse=True
    )

    selected = []
    remaining_budget = float(budget)

    for item in recommendations:
        if item["estimated_cost"] <= remaining_budget:
            selected.append(item)
            remaining_budget -= item["estimated_cost"]

    total_investment = round(
        sum(item["estimated_cost"] for item in selected),
        2
    )

    total_risk_reduction = round(
        sum(item["estimated_risk_reduction"] for item in selected),
        2
    )

    return {
        "budget": float(budget),
        "recommended_investment": total_investment,
        "remaining_budget": round(remaining_budget, 2),
        "expected_risk_reduction_points": total_risk_reduction,
        "selected_assets": selected
    }