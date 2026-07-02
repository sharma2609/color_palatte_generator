import { getTextColor } from "../utils/colorConversions.js";

export default function PreviewPanel({ palette }) {
  if (!palette || palette.length < 2) {
    return (
      <div className="preview-panel">
        <h3>UI Preview</h3>
        <p className="preview-placeholder">Generate a palette to see a preview</p>
      </div>
    );
  }

  const primary = palette[0];
  const secondary = palette[1] || primary;
  const accent = palette[2] || primary;
  const bg = palette[3] || "#1e1e1e";
  const surface = palette[4] || "#2c2c2c";
  const text = getTextColor(bg);

  const cardText = getTextColor(surface);
  const btnText = getTextColor(primary);

  return (
    <div className="preview-panel">
      <h3>UI Preview</h3>
      <div className="preview-ui" style={{ backgroundColor: bg, color: text, padding: "24px", borderRadius: "12px" }}>
        <div
          className="preview-card"
          style={{
            backgroundColor: surface,
            color: cardText,
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <h4 style={{ color: primary, margin: "0 0 8px 0" }}>Card Title</h4>
          <p style={{ margin: 0, fontSize: "14px", opacity: 0.85 }}>
            This is a preview of how your palette looks on a typical UI card
            component with headings, body text, and interactive elements.
          </p>
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <button
              style={{
                backgroundColor: primary,
                color: btnText,
                border: "none",
                padding: "8px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Primary
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                color: primary,
                border: `2px solid ${primary}`,
                padding: "8px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              Secondary
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          <span
            style={{
              backgroundColor: accent,
              color: getTextColor(accent),
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Badge
          </span>
          <span
            style={{
              backgroundColor: secondary,
              color: getTextColor(secondary),
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Tag
          </span>
        </div>

        <div
          style={{
            backgroundColor: surface,
            color: cardText,
            padding: "16px",
            borderRadius: "8px",
            opacity: 0.9,
          }}
        >
          <span style={{ fontWeight: 600, color: primary }}>Status: </span>
          Active
        </div>
      </div>
    </div>
  );
}
