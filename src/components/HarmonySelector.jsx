const harmonyOptions = [
  { value: "complementary", label: "Complementary" },
  { value: "analogous", label: "Analogous" },
  { value: "triadic", label: "Triadic" },
  { value: "splitComplementary", label: "Split Complementary" },
  { value: "tetradic", label: "Tetradic" },
  { value: "monochromatic", label: "Monochromatic" },
];

export default function HarmonySelector({ value, onChange }) {
  return (
    <div className="harmony-selector">
      <label htmlFor="harmonyType">Harmony Type:</label>
      <select id="harmonyType" value={value} onChange={(e) => onChange(e.target.value)}>
        {harmonyOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
