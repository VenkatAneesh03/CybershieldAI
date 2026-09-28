import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Apr", risk: 72 },
  { month: "May", risk: 68 },
  { month: "Jun", risk: 63 },
  { month: "Jul", risk: 57 },
  { month: "Aug", risk: 49 },
  { month: "Sep", risk: 35 },
];

function RiskChart({ data }) {
  return (
    <div className="chart-card">
      <div className="section-heading">
        <div>
          <h3>Risk Trend</h3>
          <p>Cyber risk score over the last 6 months</p>
        </div>
        <span className="trend-badge">↓ 28.6%</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
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