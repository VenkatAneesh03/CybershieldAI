import { useState } from "react";
import {
  Search,
  Filter,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Eye,
} from "lucide-react";

const vulnerabilities = [
  {
    id: "VUL-001",
    asset: "Customer Database",
    type: "SQL Injection",
    cvss: 9.8,
    severity: "Critical",
    status: "Open",
    affected: "Internet-facing",
  },
  {
    id: "VUL-002",
    asset: "Payment Server",
    type: "Remote Code Execution",
    cvss: 9.1,
    severity: "Critical",
    status: "Open",
    affected: "Internet-facing",
  },
  {
    id: "VUL-003",
    asset: "Public Web Server",
    type: "Outdated Software",
    cvss: 8.6,
    severity: "High",
    status: "Open",
    affected: "Internet-facing",
  },
  {
    id: "VUL-004",
    asset: "HR Database",
    type: "Weak Authentication",
    cvss: 7.5,
    severity: "High",
    status: "Open",
    affected: "Internal",
  },
  {
    id: "VUL-005",
    asset: "Employee Portal",
    type: "Cross-Site Scripting",
    cvss: 6.4,
    severity: "Medium",
    status: "Open",
    affected: "Internal",
  },
  {
    id: "VUL-006",
    asset: "Email Server",
    type: "Configuration Issue",
    cvss: 5.8,
    severity: "Medium",
    status: "In Progress",
    affected: "Internal",
  },
  {
    id: "VUL-007",
    asset: "Office Router",
    type: "Weak Configuration",
    cvss: 4.2,
    severity: "Low",
    status: "Open",
    affected: "Internal",
  },
  {
    id: "VUL-008",
    asset: "Developer Laptop",
    type: "Missing Security Patch",
    cvss: 3.1,
    severity: "Low",
    status: "Resolved",
    affected: "Internal",
  },
];

function Vulnerabilities() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filteredVulnerabilities = vulnerabilities.filter((vulnerability) => {
    const matchesSearch =
      vulnerability.asset.toLowerCase().includes(search.toLowerCase()) ||
      vulnerability.type.toLowerCase().includes(search.toLowerCase()) ||
      vulnerability.id.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity =
      severityFilter === "All" ||
      vulnerability.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  const severityCounts = {
    Critical: vulnerabilities.filter((v) => v.severity === "Critical").length,
    High: vulnerabilities.filter((v) => v.severity === "High").length,
    Medium: vulnerabilities.filter((v) => v.severity === "Medium").length,
    Low: vulnerabilities.filter((v) => v.severity === "Low").length,
  };

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "Critical":
        return {
          background: "rgba(239, 68, 68, 0.15)",
          color: "#f87171",
        };
      case "High":
        return {
          background: "rgba(249, 115, 22, 0.15)",
          color: "#fb923c",
        };
      case "Medium":
        return {
          background: "rgba(234, 179, 8, 0.15)",
          color: "#facc15",
        };
      case "Low":
        return {
          background: "rgba(59, 130, 246, 0.15)",
          color: "#60a5fa",
        };
      default:
        return {};
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Resolved") {
      return {
        background: "rgba(34, 197, 94, 0.15)",
        color: "#4ade80",
      };
    }

    if (status === "In Progress") {
      return {
        background: "rgba(234, 179, 8, 0.15)",
        color: "#facc15",
      };
    }

    return {
      background: "rgba(239, 68, 68, 0.15)",
      color: "#f87171",
    };
  };

  return (
    <div
      style={{
        minHeight: "100%",
        color: "#e5e7eb",
      }}
    >
      {/* Page Heading */}
      <div style={{ marginBottom: "28px" }}>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            margin: "0 0 8px 0",
          }}
        >
          Vulnerabilities
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: 0,
            fontSize: "15px",
          }}
        >
          Monitor and manage detected security vulnerabilities.
        </p>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <SummaryCard
          title="Critical"
          count={severityCounts.Critical}
          icon={<ShieldAlert size={22} />}
          color="#f87171"
        />

        <SummaryCard
          title="High"
          count={severityCounts.High}
          icon={<AlertTriangle size={22} />}
          color="#fb923c"
        />

        <SummaryCard
          title="Medium"
          count={severityCounts.Medium}
          icon={<AlertCircle size={22} />}
          color="#facc15"
        />

        <SummaryCard
          title="Low"
          count={severityCounts.Low}
          icon={<CheckCircle2 size={22} />}
          color="#60a5fa"
        />
      </div>

      {/* Search + Filter */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "240px",
            position: "relative",
          }}
        >
          <Search
            size={19}
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
            }}
          />

          <input
            type="text"
            placeholder="Search vulnerabilities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 15px 13px 45px",
              background: "#0f1b2d",
              border: "1px solid #1e2d42",
              borderRadius: "10px",
              color: "#e5e7eb",
              outline: "none",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ position: "relative" }}>
          <Filter
            size={17}
            style={{
              position: "absolute",
              left: "13px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
              pointerEvents: "none",
            }}
          />

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            style={{
              padding: "13px 40px 13px 38px",
              background: "#0f1b2d",
              border: "1px solid #1e2d42",
              borderRadius: "10px",
              color: "#e5e7eb",
              outline: "none",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option value="All">All Severity</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Vulnerability Table */}
      <div
        style={{
          background: "#0b1627",
          border: "1px solid #1b2a3d",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 22px",
            borderBottom: "1px solid #1b2a3d",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Vulnerability Findings
          </h3>

          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "13px",
            }}
          >
            {filteredVulnerabilities.length} findings detected
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "850px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#0e1a2c",
                  color: "#64748b",
                  fontSize: "12px",
                  textTransform: "uppercase",
                }}
              >
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Asset</th>
                <th style={thStyle}>Vulnerability</th>
                <th style={thStyle}>CVSS</th>
                <th style={thStyle}>Severity</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Exposure</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredVulnerabilities.map((vulnerability) => (
                <tr
                  key={vulnerability.id}
                  style={{
                    borderTop: "1px solid #17263a",
                  }}
                >
                  <td style={tdStyle}>{vulnerability.id}</td>

                  <td
                    style={{
                      ...tdStyle,
                      color: "#f1f5f9",
                      fontWeight: "600",
                    }}
                  >
                    {vulnerability.asset}
                  </td>

                  <td style={tdStyle}>{vulnerability.type}</td>

                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: "700",
                      color:
                        vulnerability.cvss >= 9
                          ? "#f87171"
                          : vulnerability.cvss >= 7
                          ? "#fb923c"
                          : "#e5e7eb",
                    }}
                  >
                    {vulnerability.cvss}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...badgeStyle,
                        ...getSeverityStyle(vulnerability.severity),
                      }}
                    >
                      {vulnerability.severity}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...badgeStyle,
                        ...getStatusStyle(vulnerability.status),
                      }}
                    >
                      {vulnerability.status}
                    </span>
                  </td>

                  <td style={tdStyle}>{vulnerability.affected}</td>

                  <td style={tdStyle}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 11px",
                        background: "transparent",
                        border: "1px solid #263a53",
                        borderRadius: "7px",
                        color: "#93c5fd",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                      onClick={() =>
                        alert(
                          `${vulnerability.id}\n\nAsset: ${vulnerability.asset}\nVulnerability: ${vulnerability.type}\nCVSS: ${vulnerability.cvss}\nSeverity: ${vulnerability.severity}`
                        )
                      }
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVulnerabilities.length === 0 && (
          <div
            style={{
              padding: "45px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No vulnerabilities found.
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, count, icon, color }) {
  return (
    <div
      style={{
        background: "#0b1627",
        border: "1px solid #1b2a3d",
        borderRadius: "14px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p
          style={{
            margin: "0 0 8px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          {title} Vulnerabilities
        </p>

        <h3
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          {count}
        </h3>
      </div>

      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${color}18`,
          color: color,
        }}
      >
        {icon}
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "14px 16px",
  fontWeight: "600",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "16px",
  fontSize: "13px",
  color: "#94a3b8",
  whiteSpace: "nowrap",
};

const badgeStyle = {
  display: "inline-block",
  padding: "5px 9px",
  borderRadius: "6px",
  fontSize: "11px",
  fontWeight: "600",
};

export default Vulnerabilities;