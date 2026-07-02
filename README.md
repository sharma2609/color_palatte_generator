# Palette Pro

A browser-based color palette designer for developers and UI designers. Generate harmonious color schemes, export to your design system, check contrast compliance, and preview palettes on a live UI mockup — all without leaving the browser.

## Overview

Choosing a color scheme is one of the hardest parts of UI design. Palette Pro solves this by giving you a single workspace where you can explore color harmonies, generate Tailwind-style shade ladders, test contrast ratios, and export production-ready code — no account, no API, no backend.

Everything runs client-side in React. Palettes are persisted to `localStorage` across sessions.

## Features

- **Six color harmonies** — Complementary, Analogous, Triadic, Split Complementary, Tetradic, and Monochromatic. Each generated algorithmically from a user-chosen base color.
- **Shade ladder** — Tailwind-style 50–900 scale generated from any color in your palette.
- **Lock individual colors** — Lock specific swatches before regenerating; locked colors are preserved.
- **Multi-format clipboard** — Click any swatch to copy its HEX, RGB, or HSL value.
- **Code export** — Export your palette as CSS Custom Properties, Tailwind CSS config, SCSS variables, or plain JSON.
- **Contrast checker** — Pairwise WCAG AA/AAA grading with contrast ratios.
- **Live UI preview** — A realistic card/button/badge mockup rendered with the active palette, updating in real time.
- **Color blindness simulation** — Protanopia, Deuteranopia, Tritanopia, and Achromatopsia overlays.
- **Theme templates** — 22 one-click starter themes (Ocean, Dracula, Tokyo Night, Catppuccin, Cyberpunk, etc.).
- **Save & history** — Save palettes to `localStorage` and browse the last 50 auto-saved generations.
- **Random palette generator** — Quick random palettes with 5 colors.
- **Toast notifications** — Non-intrusive feedback for copy, save, load, and error actions.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | JavaScript (JSX) |
| Framework | React 18.3 |
| Bundler | Vite 5.3 |
| Linter | ESLint 8.57 |
| Test runner | Vitest 4.1 |
| Formatter | Prettier (`.prettierrc`) |

No external runtime dependencies beyond `react` and `react-dom`. No backend, database, or API services.

## Installation

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/your-username/color-palette-generator.git
cd color-palette-generator
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Generate a custom harmony palette

1. The **Generator** tab is open by default.
2. Select **Custom** mode and pick a **Base Color** using the native color picker or hex input.
3. Choose a **Harmony** type (Complementary, Analogous, Triadic, etc.).
4. Click **Generate**. Swatches appear with HEX, RGB, and HSL copy buttons.
5. Click the lock icon on any swatch to preserve it on the next generation.

### Explore theme templates

1. Click the **Themes** tab in the nav bar.
2. Browse 22 preset color templates.
3. Click one to load it — you're returned to the Generator tab with the palette applied.

### Export for your design system

1. Generate or load a palette.
2. Click **Export** in the palette toolbar.
3. Choose a format: CSS Custom Properties, Tailwind Config, SCSS Variables, or JSON.
4. Click **Copy to Clipboard**.

### Run tests

```bash
npm test
```

### Production build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Project Structure

```
src/
├── main.jsx                            # React entry point
├── App.jsx                             # Root component
├── index.css                           # Global styles
├── components/
│   ├── ColorPaletteGenerator.jsx        # Orchestrator (state, coordination)
│   ├── NavBar.jsx                       # Tab navigation (5 sections)
│   ├── ColorSwatch.jsx                  # Single swatch (HEX/RGB/HSL copy, lock)
│   ├── ColorPicker.jsx                  # Native picker + hex text input
│   ├── HarmonySelector.jsx              # Harmony type dropdown
│   ├── ShadeLadder.jsx                  # Tailwind 50–900 shade scale
│   ├── PreviewPanel.jsx                 # Live UI mockup
│   ├── ContrastChecker.jsx              # WCAG contrast pair analysis
│   ├── ExportPanel.jsx                  # Code export modal
│   ├── SavedPalettes.jsx                # localStorage gallery
│   ├── PaletteHistory.jsx               # Recent palette list
│   ├── ThemeTemplates.jsx               # 22 one-click starter themes
│   ├── ColorBlindnessSim.jsx            # Simulation overlays
│   └── Toast.jsx                        # Auto-dismiss notifications
├── utils/
│   ├── colorUtils.js                   # Random color generation
│   ├── colorConversions.js             # hex ↔ rgb ↔ hsl, text color
│   ├── colorHarmonies.js               # 6 harmony algorithms + shade ladder
│   ├── contrast.js                     # Luminance, ratio, WCAG grading
│   ├── colorBlindness.js               # Simulation matrices
│   └── exportUtils.js                  # CSS/Tailwind/SCSS/JSON formatters
├── hooks/
│   ├── useLocalStorage.js              # Persistent state hook
│   └── useToast.js                     # Toast notification queue
└── styles/
    ├── App.css
    └── ColorPaletteGenerator.css        # All component styles
```

## Configuration

No environment variables or configuration files are required. All settings are managed through the UI.

Optional files you may add:

- `.env` — ignored by git (see `.gitignore`). No environment variables are read at runtime, so this is a placeholder only.
- `.prettierrc` — already included with default formatting rules.

## License

This project is unlicensed (no `LICENSE` file found). All rights reserved by default.
