import { useState, useCallback } from "react";
import "../styles/ColorPaletteGenerator.css";
import { generateRandomPalette } from "../utils/colorUtils.js";
import { generateHarmony } from "../utils/colorHarmonies.js";
import {
  simulateProtanopia,
  simulateDeuteranopia,
  simulateTritanopia,
  simulateAchromatopsia,
} from "../utils/colorBlindness.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useToast } from "../hooks/useToast.js";

import NavBar from "./NavBar.jsx";
import ColorPicker from "./ColorPicker.jsx";
import HarmonySelector from "./HarmonySelector.jsx";
import ColorSwatch from "./ColorSwatch.jsx";
import ShadeLadder from "./ShadeLadder.jsx";
import PreviewPanel from "./PreviewPanel.jsx";
import ContrastChecker from "./ContrastChecker.jsx";
import ExportPanel from "./ExportPanel.jsx";
import SavedPalettes from "./SavedPalettes.jsx";
import PaletteHistory from "./PaletteHistory.jsx";
import ThemeTemplates from "./ThemeTemplates.jsx";
import ColorBlindnessSim from "./ColorBlindnessSim.jsx";
import Toast from "./Toast.jsx";

const cbSimulators = {
  protanopia: simulateProtanopia,
  deuteranopia: simulateDeuteranopia,
  tritanopia: simulateTritanopia,
  achromatopsia: simulateAchromatopsia,
};

function applyCBMode(color, mode) {
  if (!mode || !cbSimulators[mode]) return color;
  return cbSimulators[mode](color);
}

function ColorPaletteGenerator() {
  const [activeSection, setActiveSection] = useState("generator");
  const [generationMode, setGenerationMode] = useState("custom");
  const [harmonyType, setHarmonyType] = useState("complementary");
  const [baseColor, setBaseColor] = useState("#3B82F6");
  const [palette, setPalette] = useState([]);
  const [lockedColors, setLockedColors] = useState({});
  const [showShadeLadder, setShowShadeLadder] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(null);
  const [savedPalettes, setSavedPalettes] = useLocalStorage("savedPalettes", []);
  const [history, setHistory] = useLocalStorage("paletteHistory", []);
  const { toasts, addToast, removeToast } = useToast();

  const generatePalette = useCallback(() => {
    let newPalette;

    if (generationMode === "random") {
      newPalette = generateRandomPalette(5);
    } else {
      newPalette = generateHarmony(baseColor, harmonyType);
    }

    const merged = palette.map((color, i) =>
      lockedColors[i] ? color : newPalette[i] || newPalette[0],
    );

    while (merged.length < newPalette.length) {
      merged.push(newPalette[merged.length]);
    }

    const result = merged.slice(0, newPalette.length);
    setPalette(result);
    setLockedColors((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (Number(k) >= result.length) delete next[k];
      });
      return next;
    });

    setHistory((prev) => {
      const entry = {
        colors: result,
        harmony: generationMode === "custom" ? harmonyType : "random",
        type: generationMode,
        timestamp: Date.now(),
      };
      return [...prev, entry].slice(-50);
    });
  }, [generationMode, harmonyType, baseColor, lockedColors, palette, setHistory]);

  const handleCopy = useCallback(
    async (value, format) => {
      try {
        await navigator.clipboard.writeText(value);
        addToast(`Copied ${format} to clipboard`, "success");
      } catch {
        addToast("Failed to copy to clipboard", "error");
      }
    },
    [addToast],
  );

  const toggleLock = useCallback((index) => {
    setLockedColors((prev) => {
      const next = { ...prev };
      if (next[index]) {
        delete next[index];
      } else {
        next[index] = true;
      }
      return next;
    });
  }, []);

  const saveCurrentPalette = useCallback(() => {
    if (palette.length === 0) return;
    const name = `Palette ${savedPalettes.length + 1}`;
    setSavedPalettes((prev) => [
      ...prev,
      {
        colors: palette,
        harmony: generationMode === "custom" ? harmonyType : "random",
        name,
        savedAt: Date.now(),
      },
    ]);
    addToast("Palette saved!", "success");
  }, [palette, generationMode, harmonyType, savedPalettes, setSavedPalettes, addToast]);

  const loadSavedPalette = useCallback(
    (colors) => {
      setPalette(colors);
      setLockedColors({});
      setActiveSection("generator");
      addToast("Palette loaded", "info");
    },
    [addToast],
  );

  const deleteSavedPalette = useCallback(
    (index) => {
      setSavedPalettes((prev) => prev.filter((_, i) => i !== index));
      addToast("Palette deleted", "info");
    },
    [setSavedPalettes, addToast],
  );

  const restoreHistory = useCallback(
    (entry) => {
      setPalette(entry.colors);
      setLockedColors({});
      if (entry.type === "custom" && entry.harmony) {
        setHarmonyType(entry.harmony);
      }
      setActiveSection("generator");
      addToast("Restored from history", "info");
    },
    [addToast],
  );

  const loadTemplate = useCallback(
    (colors) => {
      setPalette(colors);
      setLockedColors({});
      setGenerationMode("custom");
      setActiveSection("generator");
      addToast("Theme loaded", "success");
    },
    [addToast],
  );

  const displayPalette = colorBlindMode
    ? palette.map((c) => applyCBMode(c, colorBlindMode))
    : palette;

  const renderGenerator = () => (
    <div className="section generator-view">
      <div className="controls-card">
        <div className="controls-row">
          <div className="control-group">
            <label>Mode</label>
            <div className="mode-toggle">
              <button
                className={`mode-btn ${generationMode === "custom" ? "active" : ""}`}
                onClick={() => setGenerationMode("custom")}
              >
                Custom
              </button>
              <button
                className={`mode-btn ${generationMode === "random" ? "active" : ""}`}
                onClick={() => setGenerationMode("random")}
              >
                Random
              </button>
            </div>
          </div>

          {generationMode === "custom" && (
            <>
              <div className="control-group">
                <label>Base Color</label>
                <ColorPicker value={baseColor} onChange={setBaseColor} />
              </div>
              <div className="control-group">
                <label>Harmony</label>
                <HarmonySelector value={harmonyType} onChange={setHarmonyType} />
              </div>
            </>
          )}

          <div className="control-group control-action">
            <label>&nbsp;</label>
            <button className="generate-btn" onClick={generatePalette}>
              Generate
            </button>
          </div>
        </div>
      </div>

      <div className="palette-card">
        <div className="palette-header">
          <h3>
            Palette
            {generationMode === "custom" && harmonyType && (
              <span className="badge-harmony">{harmonyType}</span>
            )}
          </h3>
          <div className="palette-toolbar">
            {palette.length > 0 && (
              <>
                <button className="toolbar-btn" onClick={saveCurrentPalette}>
                  💾 Save
                </button>
                <button
                  className={`toolbar-btn ${showShadeLadder ? "active" : ""}`}
                  onClick={() => setShowShadeLadder((s) => !s)}
                >
                  📊 Shades
                </button>
                <button className="toolbar-btn" onClick={() => setShowExport(true)}>
                  📦 Export
                </button>
              </>
            )}
          </div>
        </div>

        {palette.length === 0 ? (
          <div className="palette-empty">
            <div className="empty-icon">🎨</div>
            <p>Click Generate to create a palette</p>
            <p className="empty-hint">
              Choose a harmony type or try random mode
            </p>
          </div>
        ) : (
          <div className="palette-grid">
            {displayPalette.map((color, i) => (
              <ColorSwatch
                key={`${palette[i]}-${i}`}
                color={color}
                locked={!!lockedColors[i]}
                onToggleLock={() => toggleLock(i)}
                onCopy={handleCopy}
              />
            ))}
          </div>
        )}
      </div>

      {showShadeLadder && palette.length > 0 && (
        <ShadeLadder baseColor={displayPalette[0]} />
      )}

      {palette.length > 0 && (
        <ColorBlindnessSim
          palette={palette}
          activeMode={colorBlindMode}
          onSelectMode={setColorBlindMode}
        />
      )}
    </div>
  );

  const renderThemes = () => (
    <div className="section">
      <ThemeTemplates onSelect={loadTemplate} />
    </div>
  );

  const renderSaved = () => (
    <div className="section">
      <SavedPalettes
        palettes={savedPalettes}
        onLoad={loadSavedPalette}
        onDelete={deleteSavedPalette}
      />
    </div>
  );

  const renderHistory = () => (
    <div className="section">
      <PaletteHistory history={history} onRestore={restoreHistory} />
    </div>
  );

  const renderTools = () => (
    <div className="section tools-view">
      <ContrastChecker palette={displayPalette} />
      <PreviewPanel palette={displayPalette} />
    </div>
  );

  return (
    <div className="app-layout">
      <NavBar activeSection={activeSection} onSelect={setActiveSection} />

      <main className="main-content">
        {activeSection === "generator" && renderGenerator()}
        {activeSection === "themes" && renderThemes()}
        {activeSection === "saved" && renderSaved()}
        {activeSection === "history" && renderHistory()}
        {activeSection === "tools" && renderTools()}
      </main>

      {showExport && (
        <>
          <div className="export-overlay" onClick={() => setShowExport(false)} />
          <ExportPanel
            palette={palette}
            onCopy={handleCopy}
            onClose={() => setShowExport(false)}
          />
        </>
      )}

      <div className="toast-container">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onRemove={removeToast} />
        ))}
      </div>
    </div>
  );
}

export default ColorPaletteGenerator;
