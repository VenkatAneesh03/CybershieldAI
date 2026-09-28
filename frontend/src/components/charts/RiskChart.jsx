import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { riskData } from "../../data/riskData";

function RiskChart() {
  return (
    <div className="chart-card">
      <div className="section-heading">
        <div>
          <h3>Risk Trend</h3>
          <p>Cyber risk score over the last 6 months</p>
        </div>

        <span className="trend-badge">
          ↓ {riskData.riskReduction}%
        </span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={riskData.monthlyRisk}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="risk"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RiskChart;