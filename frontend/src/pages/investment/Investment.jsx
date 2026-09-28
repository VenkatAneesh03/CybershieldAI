import {
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Target,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

function Investment() {
  const investments = [
    {
      asset: "VPN Gateway",
      risk: 84.8,
      level: "Critical",
      action: "Deploy MFA + strengthen access controls",
      cost: 450000,
      reduction: 32,
      priority: "Very High",
    },
    {
      asset: "Remote Access Server",
      risk: 81.65,
      level: "Critical",
      action: "Upgrade EDR + patch critical vulnerabilities",
      cost: 350000,
      reduction: 27,
      priority: "Very High",
    },
    {
      asset: "Payment Server",
      risk: 76.6,
      level: "Critical",
      action: "Patch vulnerabilities + improve monitoring",
      cost: 500000,
      reduction: 24,
      priority: "High",
    },
    {
      asset: "Public Web Server",
      risk: 74.95,
      level: "High",
      action: "Web protection + vulnerability remediation",
      cost: 300000,
      reduction: 21,
      priority: "High",
    },
  ];

  const formatINR = (value) => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Security Investment</h2>

          <p style={styles.subtitle}>
            Optimize cybersecurity spending based on financial risk and
            expected risk reduction.
          </p>
        </div>

        <button style={styles.optimizeButton}>
          <Target size={18} />
          Optimize Budget
        </button>
      </div>

      {/* Summary Cards */}
      <div style={styles.cardGrid}>

        <div style={styles.card}>
          <div style={styles.iconBox}>
            <DollarSign size={22} />
          </div>

          <div>
            <p style={styles.cardLabel}>Security Budget</p>
            <h3 style={styles.cardValue}>₹20.0L</h3>
            <span style={styles.cardInfo}>
              Available for allocation
            </span>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>
            <TrendingDown size={22} />
          </div>

          <div>
            <p style={styles.cardLabel}>Expected Risk Reduction</p>
            <h3 style={styles.cardValue}>31.4%</h3>
            <span style={styles.cardInfo}>
              After recommended investments
            </span>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>
            <ShieldCheck size={22} />
          </div>

          <div>
            <p style={styles.cardLabel}>Recommended Allocation</p>
            <h3 style={styles.cardValue}>₹16.0L</h3>
            <span style={styles.cardInfo}>
              Optimized security spending
            </span>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.iconBox}>
            <ArrowUpRight size={22} />
          </div>

          <div>
            <p style={styles.cardLabel}>Estimated Benefit</p>
            <h3 style={styles.cardValue}>₹42.6L</h3>
            <span style={styles.cardInfo}>
              Potential annual loss avoided
            </span>
          </div>
        </div>

      </div>

      {/* Budget Allocation */}
      <div style={styles.section}>

        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.sectionTitle}>
              Budget Allocation
            </h3>

            <p style={styles.sectionSubtitle}>
              Recommended allocation based on asset risk and financial exposure.
            </p>
          </div>

          <div style={styles.budgetAmount}>
            ₹16.0L / ₹20.0L
          </div>
        </div>

        <div style={styles.progressBackground}>
          <div style={styles.progressFill}></div>
        </div>

        <div style={styles.progressLabels}>
          <span>Recommended: ₹16.0L</span>
          <span>Remaining: ₹4.0L</span>
        </div>

      </div>

      {/* Recommended Investments */}
      <div style={styles.section}>

        <div style={styles.sectionHeader}>
          <div>
            <h3 style={styles.sectionTitle}>
              Recommended Security Investments
            </h3>

            <p style={styles.sectionSubtitle}>
              Highest-priority actions based on quantified cyber risk.
            </p>
          </div>
        </div>

        <div style={styles.tableWrapper}>

          <table style={styles.table}>

            <thead>
              <tr>
                <th style={styles.th}>Asset</th>
                <th style={styles.th}>Risk Score</th>
                <th style={styles.th}>Risk Level</th>
                <th style={styles.th}>Recommended Action</th>
                <th style={styles.th}>Investment</th>
                <th style={styles.th}>Risk Reduction</th>
                <th style={styles.th}>Priority</th>
              </tr>
            </thead>

            <tbody>

              {investments.map((item, index) => (
                <tr key={index}>

                  <td style={styles.td}>
                    <strong>{item.asset}</strong>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.riskScore}>
                      {item.risk}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        ...(item.level === "Critical"
                          ? styles.critical
                          : styles.high),
                      }}
                    >
                      {item.level}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {item.action}
                  </td>

                  <td style={styles.td}>
                    <strong>{formatINR(item.cost)}</strong>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.reduction}>
                      ↓ {item.reduction}%
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.priority}>
                      {item.priority}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* Optimization Result */}
      <div style={styles.resultBox}>

        <div style={styles.resultIcon}>
          <CheckCircle2 size={28} />
        </div>

        <div>
          <h3 style={styles.resultTitle}>
            Recommended Investment Strategy
          </h3>

          <p style={styles.resultText}>
            CyberShield recommends prioritizing the VPN Gateway, Remote Access
            Server, Payment Server and Public Web Server because they combine
            high cyber risk with significant business impact.
          </p>
        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "32px 38px",
    color: "#e8edf7",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
  },

  subtitle: {
    marginTop: "7px",
    color: "#8995aa",
    fontSize: "14px",
  },

  optimizeButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 18px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #4f7cff, #7355e8)",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "22px",
  },

  card: {
    background: "rgba(16, 29, 51, 0.75)",
    border: "1px solid rgba(110, 130, 170, 0.16)",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },

  iconBox: {
    width: "44px",
    height: "44px",
    borderRadius: "11px",
    background: "rgba(76, 111, 255, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6d8cff",
  },

  cardLabel: {
    margin: 0,
    color: "#8995aa",
    fontSize: "12px",
  },

  cardValue: {
    margin: "5px 0",
    fontSize: "22px",
  },

  cardInfo: {
    color: "#657188",
    fontSize: "11px",
  },

  section: {
    background: "rgba(12, 24, 44, 0.72)",
    border: "1px solid rgba(110, 130, 170, 0.14)",
    borderRadius: "14px",
    padding: "22px",
    marginBottom: "22px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "18px",
  },

  sectionSubtitle: {
    margin: "6px 0 0",
    color: "#7f8ba1",
    fontSize: "13px",
  },

  budgetAmount: {
    fontSize: "17px",
    fontWeight: 700,
  },

  progressBackground: {
    height: "10px",
    borderRadius: "10px",
    background: "#17243a",
    overflow: "hidden",
  },

  progressFill: {
    width: "80%",
    height: "100%",
    borderRadius: "10px",
    background: "linear-gradient(90deg, #477bff, #7256e8)",
  },

  progressLabels: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "9px",
    color: "#78859b",
    fontSize: "12px",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },

  th: {
    textAlign: "left",
    padding: "13px 12px",
    color: "#7e8ba3",
    fontWeight: 600,
    borderBottom: "1px solid rgba(110,130,170,0.15)",
  },

  td: {
    padding: "16px 12px",
    borderBottom: "1px solid rgba(110,130,170,0.09)",
    color: "#b8c2d3",
  },

  riskScore: {
    fontWeight: 700,
    color: "#ffbd66",
  },

  badge: {
    padding: "5px 9px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
  },

  critical: {
    background: "rgba(255, 80, 80, 0.14)",
    color: "#ff7373",
  },

  high: {
    background: "rgba(255, 170, 60, 0.14)",
    color: "#ffb45c",
  },

  reduction: {
    color: "#4ed69a",
    fontWeight: 600,
  },

  priority: {
    color: "#d0d7e5",
    fontWeight: 600,
  },

  resultBox: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    padding: "20px",
    borderRadius: "14px",
    background: "rgba(41, 117, 91, 0.10)",
    border: "1px solid rgba(61, 190, 135, 0.18)",
  },

  resultIcon: {
    color: "#43d397",
  },

  resultTitle: {
    margin: 0,
    fontSize: "16px",
  },

  resultText: {
    margin: "6px 0 0",
    color: "#8995aa",
    fontSize: "13px",
    lineHeight: 1.6,
  },
};

export default Investment;