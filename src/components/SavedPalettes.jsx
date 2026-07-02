export default function SavedPalettes({ palettes, onLoad, onDelete }) {
  if (!palettes || palettes.length === 0) {
    return (
      <div className="saved-palettes">
        <h3>Saved Palettes</h3>
        <p className="saved-placeholder">No saved palettes yet</p>
      </div>
    );
  }

  return (
    <div className="saved-palettes">
      <h3>Saved Palettes ({palettes.length})</h3>
      <div className="saved-grid">
        {palettes.map((item, idx) => (
          <div key={idx} className="saved-card">
            <div className="saved-thumb">
              {item.colors.map((color, ci) => (
                <div
                  key={ci}
                  className="saved-thumb-bar"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="saved-meta">
              <span className="saved-name">{item.name || `Palette ${idx + 1}`}</span>
              <span className="saved-date">
                {new Date(item.savedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="saved-actions">
              <button
                className="saved-load-btn"
                onClick={() => onLoad(item.colors)}
              >
                Load
              </button>
              <button
                className="saved-delete-btn"
                onClick={() => onDelete(idx)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
