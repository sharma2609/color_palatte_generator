import { hexToHsl, hslToHex } from "./colorConversions.js";

function normalizeHue(h) {
  return ((h % 360) + 360) % 360;
}

export function complementary(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex];
  const comp = normalizeHue(hsl.h + 180);
  return [hex, hslToHex(comp, hsl.s, hsl.l)];
}

export function analogous(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex, hex];
  return [
    hslToHex(normalizeHue(hsl.h - 30), hsl.s, hsl.l),
    hex,
    hslToHex(normalizeHue(hsl.h + 30), hsl.s, hsl.l),
  ];
}

export function triadic(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex, hex];
  return [
    hex,
    hslToHex(normalizeHue(hsl.h + 120), hsl.s, hsl.l),
    hslToHex(normalizeHue(hsl.h + 240), hsl.s, hsl.l),
  ];
}

export function splitComplementary(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex, hex];
  return [
    hex,
    hslToHex(normalizeHue(hsl.h + 150), hsl.s, hsl.l),
    hslToHex(normalizeHue(hsl.h + 210), hsl.s, hsl.l),
  ];
}

export function tetradic(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex, hex, hex];
  return [
    hex,
    hslToHex(normalizeHue(hsl.h + 90), hsl.s, hsl.l),
    hslToHex(normalizeHue(hsl.h + 180), hsl.s, hsl.l),
    hslToHex(normalizeHue(hsl.h + 270), hsl.s, hsl.l),
  ];
}

export function monochromatic(hex, count = 5) {
  const hsl = hexToHsl(hex);
  if (!hsl) return Array(count).fill(hex);
  const colors = [];
  for (let i = 0; i < count; i++) {
    const offset = i - Math.floor(count / 2);
    const l = Math.max(5, Math.min(95, hsl.l + offset * 15));
    const s = Math.max(5, hsl.s - Math.abs(offset) * 8);
    colors.push(hslToHex(hsl.h, s, l));
  }
  return colors;
}

export function generateShadeLadder(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) {
    const fallback = {};
    for (const n of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]) {
      fallback[n] = hex;
    }
    return fallback;
  }
  return {
    50: hslToHex(hsl.h, Math.max(5, Math.round(hsl.s * 0.4)), 97),
    100: hslToHex(hsl.h, Math.max(8, Math.round(hsl.s * 0.6)), 93),
    200: hslToHex(hsl.h, Math.max(12, Math.round(hsl.s * 0.75)), 85),
    300: hslToHex(hsl.h, Math.max(16, Math.round(hsl.s * 0.85)), 72),
    400: hslToHex(hsl.h, Math.max(20, Math.round(hsl.s * 0.95)), 60),
    500: hex,
    600: hslToHex(hsl.h, Math.max(20, Math.round(hsl.s * 0.95)), 45),
    700: hslToHex(hsl.h, Math.max(16, Math.round(hsl.s * 0.9)), 32),
    800: hslToHex(hsl.h, Math.max(12, Math.round(hsl.s * 0.8)), 20),
    900: hslToHex(hsl.h, Math.max(8, Math.round(hsl.s * 0.7)), 10),
  };
}

export function generateHarmony(hex, type) {
  const generators = {
    complementary,
    analogous,
    triadic,
    splitComplementary,
    tetradic,
    monochromatic,
  };
  const fn = generators[type];
  if (!fn) return [hex];
  return fn(type === "monochromatic" ? hex : hex, type === "monochromatic" ? 5 : undefined);
}
