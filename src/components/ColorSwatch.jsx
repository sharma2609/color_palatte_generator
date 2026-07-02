import { hexToRgb, hexToHsl, formatRgb, formatHsl, getTextColor } from "../utils/colorConversions.js";

export default function ColorSwatch({ color, locked, onToggleLock, onCopy }) {
  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);
  if (!rgb || !hsl) return null;

  const textColor = getTextColor(color);

  return (
    <div className="color-swatch">
      <div
        className="color-swatch-bar"
        style={{ backgroundColor: color, color: textColor }}
      >
        <button
          className={`swatch-lock-btn ${locked ? "locked" : ""}`}
          onClick={onToggleLock}
          title={locked ? "Unlock" : "Lock"}
          style={{ color: textColor }}
        >
          {locked ? "🔒" : "🔓"}
        </button>
        <span className="swatch-hex">{color}</span>
      </div>
      <div className="swatch-formats">
        <button
          className="swatch-copy-btn"
          onClick={() => onCopy(color, "hex")}
          title="Copy HEX"
        >
          {color}
        </button>
        <button
          className="swatch-copy-btn"
          onClick={() => onCopy(formatRgb(rgb.r, rgb.g, rgb.b), "rgb")}
          title="Copy RGB"
        >
          {formatRgb(rgb.r, rgb.g, rgb.b)}
        </button>
        <button
          className="swatch-copy-btn"
          onClick={() => onCopy(formatHsl(hsl.h, hsl.s, hsl.l), "hsl")}
          title="Copy HSL"
        >
          {formatHsl(hsl.h, hsl.s, hsl.l)}
        </button>
      </div>
    </div>
  );
}
