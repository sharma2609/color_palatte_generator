export default function PaletteHistory({ history, onRestore }) {
  if (!history || history.length === 0) {
    return (
      <div className="palette-history">
        <h3>History</h3>
        <p className="history-placeholder">No history yet</p>
      </div>
    );
  }

  const display = history.slice(-10).reverse();

  return (
    <div className="palette-history">
      <h3>Recent Palettes</h3>
      <div className="history-list">
        {display.map((entry, idx) => (
          <div
            key={idx}
            className="history-item"
            onClick={() => onRestore(entry)}
          >
            <div className="history-colors">
              {entry.colors.map((color, ci) => (
                <div
                  key={ci}
                  className="history-color-dot"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="history-detail">
              {entry.harmony || entry.type} &middot;{" "}
              {new Date(entry.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
