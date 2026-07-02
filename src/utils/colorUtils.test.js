import { describe, it, expect } from "vitest";
import {
  getRandomColor,
  generateRandomPalette,
} from "./colorUtils.js";

describe("getRandomColor", () => {
  it("returns a valid hex color", () => {
    const color = getRandomColor();
    expect(color).toMatch(/^#[0-9A-F]{6}$/);
  });

  it("produces varying results", () => {
    const colors = new Set(Array.from({ length: 20 }, () => getRandomColor()));
    expect(colors.size).toBeGreaterThan(1);
  });
});

describe("generateRandomPalette", () => {
  it("generates the correct number of colors", () => {
    const palette = generateRandomPalette(5);
    expect(palette).toHaveLength(5);
  });

  it("all colors are valid hex", () => {
    const palette = generateRandomPalette(10);
    palette.forEach((c) => {
      expect(c).toMatch(/^#[0-9A-F]{6}$/);
    });
  });
});
