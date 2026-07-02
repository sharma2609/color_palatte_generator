import { colorBlindnessTypes } from "../utils/colorBlindness.js";

export default function ColorBlindnessSim({ palette, activeMode, onSelectMode }) {
  return (
    <div className="cb-sim">
      <h3>Color Blindness Simulation</h3>
      <div className="cb-buttons">
        <button
          className={`cb-btn ${!activeMode ? "active" : ""}`}
          onClick={() => onSelectMode(null)}
        >
          Normal
        </button>
        {colorBlindnessTypes.map((type) => (
          <button
            key={type.id}
            className={`cb-btn ${activeMode === type.id ? "active" : ""}`}
            onClick={() => onSelectMode(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>
      {activeMode && palette.length > 0 && (
        <div className="cb-preview">
          {palette.map((color, i) => {
            const simFn = colorBlindnessTypes.find(
              (t) => t.id === activeMode,
            )?.fn;
            const simColor = simFn ? simFn(color) : color;
            return (
              <div
                key={i}
                className="cb-swatch"
                style={{ backgroundColor: simColor }}
                title={`${color} → ${simColor}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
