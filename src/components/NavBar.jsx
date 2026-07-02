const sections = [
  { id: "generator", label: "Generator", icon: "🎨" },
  { id: "themes", label: "Themes", icon: "🌈" },
  { id: "saved", label: "Saved", icon: "💾" },
  { id: "history", label: "History", icon: "⏱" },
  { id: "tools", label: "Tools", icon: "🔧" },
];

export default function NavBar({ activeSection, onSelect }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🎨</span>
        <span className="navbar-title">Palette Pro</span>
      </div>
      <div className="navbar-links">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`nav-link ${activeSection === s.id ? "active" : ""}`}
            onClick={() => onSelect(s.id)}
          >
            <span className="nav-icon">{s.icon}</span>
            <span className="nav-label">{s.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
