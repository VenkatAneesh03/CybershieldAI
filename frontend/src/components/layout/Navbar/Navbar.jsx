import { Bell, Search, ShieldCheck } from "lucide-react";

function Navbar({ activePage }) {
  return (
    <header className="navbar">
      <div>
        <h1>{activePage}</h1>
        <p>Continuous Cyber Risk Quantification & Optimization</p>
      </div>

      <div className="navbar-actions">
        <div className="search">
          <Search size={17} />
          <input placeholder="Search..." />
        </div>

        <button className="icon-btn">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="avatar">AD</div>
          <div>
            <strong>Admin</strong>
            <small>Security Team</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;