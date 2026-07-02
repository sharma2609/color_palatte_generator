import { getContrastRatio, getWCAGGrade } from "../utils/contrast.js";

export default function ContrastChecker({ palette }) {
  if (!palette || palette.length < 2) {
    return (
      <div className="contrast-checker">
        <h3>Contrast Checker</h3>
        <p className="contrast-placeholder">
          Generate a palette with at least 2 colors to check contrast
        </p>
      </div>
    );
  }

  const pairs = [];
  for (let i = 0; i < Math.min(palette.length, 4); i++) {
    for (let j = i + 1; j < Math.min(palette.length, 4); j++) {
      const ratio = getContrastRatio(palette[i], palette[j]);
      pairs.push({
        color1: palette[i],
        color2: palette[j],
        ratio,
        aa: getWCAGGrade(ratio, false),
        aaLarge: getWCAGGrade(ratio, true),
      });
    }
  }

  return (
    <div className="contrast-checker">
      <h3>Contrast Checker</h3>
      <div className="contrast-pairs">
        {pairs.map((pair, idx) => (
          <div key={idx} className="contrast-pair">
            <div className="contrast-colors">
              <span
                className="contrast-swatch"
                style={{ backgroundColor: pair.color1 }}
              />
              <span className="contrast-vs">vs</span>
              <span
                className="contrast-swatch"
                style={{ backgroundColor: pair.color2 }}
              />
            </div>
            <div className="contrast-details">
              <span className="contrast-ratio">{pair.ratio.toFixed(2)}:1</span>
              <span className={`contrast-grade grade-${pair.aa.toLowerCase()}`}>
                AA: {pair.aa}
              </span>
              <span
                className={`contrast-grade grade-${pair.aaLarge.toLowerCase()}`}
              >
                AA Large: {pair.aaLarge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
