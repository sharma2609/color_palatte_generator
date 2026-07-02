import { useState } from "react";
import {
  toCSSVariables,
  toTailwindConfig,
  toSCSSVariables,
  toJSON,
} from "../utils/exportUtils.js";

const formats = [
  { id: "css", label: "CSS Custom Properties", generator: toCSSVariables },
  { id: "tailwind", label: "Tailwind Config", generator: toTailwindConfig },
  { id: "scss", label: "SCSS Variables", generator: toSCSSVariables },
  { id: "json", label: "JSON", generator: toJSON },
];

export default function ExportPanel({ palette, onCopy, onClose }) {
  const [selectedFormat, setSelectedFormat] = useState("css");
  const format = formats.find((f) => f.id === selectedFormat);
  const code = format
    ? format.generator(palette)
    : "";

  const handleCopy = () => {
    onCopy(code, "code");
  };

  if (!palette || palette.length === 0) {
    return (
      <div className="export-panel">
        <p>Generate a palette first</p>
      </div>
    );
  }

  return (
    <div className="export-panel">
      <div className="export-header">
        <h3>Export Palette</h3>
        <button className="export-close" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="export-format-select">
        {formats.map((f) => (
          <button
            key={f.id}
            className={`export-format-btn ${selectedFormat === f.id ? "active" : ""}`}
            onClick={() => setSelectedFormat(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <pre className="export-code">
        <code>{code}</code>
      </pre>
      <button className="export-copy-btn" onClick={handleCopy}>
        Copy to Clipboard
      </button>
    </div>
  );
}
