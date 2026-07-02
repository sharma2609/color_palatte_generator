const templates = [
  {
    name: "Ocean",
    colors: ["#0C4A6E", "#0369A1", "#38BDF8", "#BAE6FD", "#F0F9FF"],
  },
  {
    name: "Forest",
    colors: ["#14532D", "#15803D", "#4ADE80", "#BBF7D0", "#ECFDF5"],
  },
  {
    name: "Sunset",
    colors: ["#7C2D12", "#C2410C", "#F97316", "#FDE68A", "#FFFBEB"],
  },
  {
    name: "Midnight",
    colors: ["#0F172A", "#1E293B", "#475569", "#94A3B8", "#F8FAFC"],
  },
  {
    name: "Nord",
    colors: ["#2E3440", "#3B4252", "#5E81AC", "#88C0D0", "#ECEFF4"],
  },
  {
    name: "Dracula",
    colors: ["#282A36", "#44475A", "#BD93F9", "#50FA7B", "#F8F8F2"],
  },
  {
    name: "Solarized Dark",
    colors: ["#002B36", "#073642", "#268BD2", "#2AA198", "#93A1A1"],
  },
  {
    name: "Solarized Light",
    colors: ["#FDF6E3", "#EEE8D5", "#268BD2", "#2AA198", "#586E75"],
  },
  {
    name: "Gruvbox",
    colors: ["#282828", "#3C3836", "#D79921", "#98971A", "#EBDBB2"],
  },
  {
    name: "Catppuccin Mocha",
    colors: ["#1E1E2E", "#313244", "#89B4FA", "#A6E3A1", "#CDD6F4"],
  },
  {
    name: "Catppuccin Latte",
    colors: ["#EFF1F5", "#CCD0DA", "#1E66F5", "#40A02B", "#4C4F69"],
  },
  {
    name: "Tokyo Night",
    colors: ["#1A1B26", "#24283B", "#7AA2F7", "#9ECE6A", "#A9B1D6"],
  },
  {
    name: "Monokai",
    colors: ["#272822", "#383830", "#A6E22E", "#F92672", "#F8F8F2"],
  },
  {
    name: "One Dark",
    colors: ["#282C34", "#353B45", "#61AFEF", "#98C379", "#ABB2BF"],
  },
  {
    name: "Cyberpunk",
    colors: ["#0D0221", "#150734", "#F706CF", "#00FFF0", "#FFFDFD"],
  },
  {
    name: "Rose Pine",
    colors: ["#191724", "#26233A", "#9CCFD8", "#EB6F92", "#E0DEF4"],
  },
  {
    name: "Everforest",
    colors: ["#2F383E", "#3D484D", "#A7C080", "#D3C6AA", "#D5C9AB"],
  },
  {
    name: "Ayu Dark",
    colors: ["#0A0E14", "#1A1F29", "#39BAE6", "#AAD94C", "#B3B1AD"],
  },
  {
    name: "Material Design",
    colors: ["#212121", "#37474F", "#2196F3", "#4CAF50", "#FAFAFA"],
  },
  {
    name: "Pastel",
    colors: ["#FCE7F3", "#FED7AA", "#FEDEAA", "#D9F99D", "#A7F3D0"],
  },
  {
    name: "Vaporwave",
    colors: ["#FF71CE", "#01CDFE", "#05FFA1", "#B967FF", "#FFFB96"],
  },
  {
    name: "Minimal",
    colors: ["#18181B", "#27272A", "#52525B", "#A1A1AA", "#F4F4F5"],
  },
];

export default function ThemeTemplates({ onSelect }) {
  return (
    <div className="theme-templates">
      <h3>Theme Templates</h3>
      <p className="section-subtitle">
        Click a theme to load its palette into the generator
      </p>
      <div className="template-grid">
        {templates.map((tpl) => (
          <div
            key={tpl.name}
            className="template-card"
            onClick={() => onSelect(tpl.colors, tpl.name)}
          >
            <div className="template-thumb">
              {tpl.colors.map((color, i) => (
                <div
                  key={i}
                  className="template-bar"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="template-name">{tpl.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
