export function toCSSVariables(palette) {
  return palette.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n");
}

export function toCSSVariablesWithLabels(palette, labels) {
  return palette
    .map(
      (c, i) =>
        `  --${labels[i] || `color-${i + 1}`}: ${c};`,
    )
    .join("\n");
}

export function toTailwindConfig(palette) {
  const colors = palette.map((c, i) => `    color${i + 1}: "${c}"`);
  return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${colors.join(",\n")}\n      }\n    }\n  }\n}`;
}

export function toTailwindConfigWithLabels(palette, labels) {
  const colors = palette.map(
    (c, i) => `    ${labels[i] || `color${i + 1}`}: "${c}"`,
  );
  return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${colors.join(",\n")}\n      }\n    }\n  }\n}`;
}

export function toSCSSVariables(palette) {
  return palette
    .map((c, i) => `$${i === 0 ? "primary" : `color-${i + 1}`}: ${c};`)
    .join("\n");
}

export function toJSON(palette) {
  return JSON.stringify(palette, null, 2);
}

export const shadeLabels = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "text",
  "muted",
  "border",
  "success",
  "warning",
  "error",
  "info",
];
