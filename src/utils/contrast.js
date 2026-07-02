import { hexToRgb } from "./colorConversions.js";

function getChannelLuminance(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (
    0.2126 * getChannelLuminance(rgb.r) +
    0.7152 * getChannelLuminance(rgb.g) +
    0.0722 * getChannelLuminance(rgb.b)
  );
}

export function getContrastRatio(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getWCAGGrade(ratio, isLargeText = false) {
  if (isLargeText) {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3) return "AA";
    return "Fail";
  }
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
}
