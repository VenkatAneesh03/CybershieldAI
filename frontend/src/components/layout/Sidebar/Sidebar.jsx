import {
  LayoutDashboard,
  ShieldAlert,
  Activity,
  WalletCards,
  Sparkles,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Vulnerabilities", icon: ShieldAlert },
    { name: "Risk Analysis", icon: Activity },
    { name: "Investment", icon: WalletCards },
    { name: "AI Recommendations", icon: Sparkles },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">CR</div>
        <div>
          <h2>CyberRisk</h2>
          <span>AI Security Platform</span>
        </div>
      </div>

      <div className="menu-title">MAIN MENU</div>

      <nav>
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`menu-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="security-status">
          <div className="status-dot"></div>
          <div>
            <strong>System Secure</strong>
            <small>Last scan: 2 min ago</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;