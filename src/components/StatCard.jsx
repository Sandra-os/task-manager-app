function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <article className="stat-card" data-tone={tone}>
      <div className="stat-icon">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

export default StatCard;
