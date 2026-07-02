import { generateShadeLadder } from "../utils/colorHarmonies.js";

export default function ShadeLadder({ baseColor }) {
  const shades = generateShadeLadder(baseColor);
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="shade-ladder">
      <h3>Shade Ladder (50–900)</h3>
      <div className="ladder-bars">
        {levels.map((level) => {
          const color = shades[level];
          const isBase = level === 500;
          return (
            <div
              key={level}
              className={`ladder-bar ${isBase ? "ladder-bar-base" : ""}`}
            >
              <div
                className="ladder-fill"
                style={{ backgroundColor: color }}
              />
              <div className="ladder-label">
                <span className="ladder-level">{level}</span>
                <span className="ladder-hex">{color}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
