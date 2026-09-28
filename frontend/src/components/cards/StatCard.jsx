function StatCard({ title, value, subtitle, icon: Icon, type }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}>
        <Icon size={21} />
      </div>

      <div className="stat-info">
        <span>{title}</span>
        <h3>{value}</h3>
        <small>{subtitle}</small>
      </div>
    </div>
  );
}

export default StatCard;