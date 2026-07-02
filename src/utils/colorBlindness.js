import { hexToRgb, rgbToHex } from "./colorConversions.js";

function applyMatrix(hex, matrix) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const nr = Math.round(matrix[0] * rgb.r + matrix[1] * rgb.g + matrix[2] * rgb.b);
  const ng = Math.round(matrix[3] * rgb.r + matrix[4] * rgb.g + matrix[5] * rgb.b);
  const nb = Math.round(matrix[6] * rgb.r + matrix[7] * rgb.g + matrix[8] * rgb.b);
  return rgbToHex(
    Math.max(0, Math.min(255, nr)),
    Math.max(0, Math.min(255, ng)),
    Math.max(0, Math.min(255, nb)),
  );
}

const PROTANOPIA = [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758];
const DEUTERANOPIA = [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7];
const TRITANOPIA = [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525];
const ACHROMATOPSIA = [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114];

export function simulateProtanopia(hex) {
  return applyMatrix(hex, PROTANOPIA);
}

export function simulateDeuteranopia(hex) {
  return applyMatrix(hex, DEUTERANOPIA);
}

export function simulateTritanopia(hex) {
  return applyMatrix(hex, TRITANOPIA);
}

export function simulateAchromatopsia(hex) {
  return applyMatrix(hex, ACHROMATOPSIA);
}

export const colorBlindnessTypes = [
  { id: "protanopia", label: "Protanopia", fn: simulateProtanopia },
  { id: "deuteranopia", label: "Deuteranopia", fn: simulateDeuteranopia },
  { id: "tritanopia", label: "Tritanopia", fn: simulateTritanopia },
  { id: "achromatopsia", label: "Achromatopsia", fn: simulateAchromatopsia },
];
