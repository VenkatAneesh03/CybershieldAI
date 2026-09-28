import { useState } from "react";
import { riskData } from "../../data/riskData";
import {
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import StatCard from "../../components/cards/StatCard";
import RiskChart from "../../components/charts/RiskChart";

function Dashboard() {
  const [data, setData] = useState(riskData);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);

    setTimeout(() => {
      setData({
        ...riskData,
        overallRisk: 31.2,
        vulnerabilities: {
          total: 24,
          critical: 4,
        },
        riskReduction: 32.1,
        securityHealth: 84,
        distribution: {
          critical: 4,
          high: 8,
          medium: 7,
          low: 5,
        },
      });

      setScanning(false);
    }, 1500);
  };

  return (
    <div>
      <section className="welcome">
        <div>
          <h2>Cyber Risk Overview</h2>
          <p>
            Monitor organizational cyber risk and optimize security
            investments using AI-powered insights.
          </p>
        </div>

        <button
          className="scan-btn"
          onClick={handleScan}
          disabled={scanning}
        >
          <ShieldCheck size={18} />
          {scanning ? "Scanning..." : "Run Security Scan"}
        </button>
      </section>

      <div className="stats-grid">
        <StatCard
          title="Overall Risk Score"
          value={data.overallRisk}
          subtitle={data.overallRisk <= 35 ? "Low risk" : "Medium risk"}
          icon={ShieldCheck}
          type="green"
        />

        <StatCard
          title="Active Vulnerabilities"
          value={data.vulnerabilities.total}
          subtitle={`${data.vulnerabilities.critical} critical`}
          icon={AlertTriangle}
          type="red"
        />

        <StatCard
          title="Risk Reduction"
          value={`${data.riskReduction}%`}
          subtitle="vs. last month"
          icon={TrendingUp}
          type="blue"
        />

        <StatCard
          title="Security Investment"
          value={data.securityInvestment}
          subtitle="Annual allocation"
          icon={DollarSign}
          type="purple"
        />
      </div>

      <div className="dashboard-grid">
        <RiskChart data={data.monthlyRisk} />

        <div className="risk-summary">
          <div className="section-heading">
            <h3>Risk Distribution</h3>
            <span>Current</span>
          </div>

          <div className="risk-row">
            <span>Critical</span>
            <strong>{data.distribution.critical}</strong>
          </div>

          <div className="risk-row">
            <span>High</span>
            <strong>{data.distribution.high}</strong>
          </div>

          <div className="risk-row">
            <span>Medium</span>
            <strong>{data.distribution.medium}</strong>
          </div>

          <div className="risk-row">
            <span>Low</span>
            <strong>{data.distribution.low}</strong>
          </div>

          <div className="overall-score">
            <span>Security Health</span>
            <strong>{data.securityHealth}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;