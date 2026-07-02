export default function ColorPicker({ value, onChange }) {
  const handleHexInput = (e) => {
    let val = e.target.value;
    if (val && val[0] !== "#") {
      val = "#" + val;
    }
    onChange(val);
  };

  const handleNativeChange = (e) => {
    onChange(e.target.value);
  };

  const displayValue = value || "#000000";

  return (
    <div className="color-picker">
      <input
        type="color"
        className="native-picker"
        value={displayValue}
        onChange={handleNativeChange}
      />
      <input
        type="text"
        className="hex-input"
        value={value}
        onChange={handleHexInput}
        placeholder="#000000"
      />
    </div>
  );
}
