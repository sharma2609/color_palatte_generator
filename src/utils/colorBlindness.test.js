import { describe, it, expect } from "vitest";
import {
  simulateProtanopia,
  simulateDeuteranopia,
  simulateTritanopia,
  simulateAchromatopsia,
} from "./colorBlindness.js";

describe("simulateProtanopia", () => {
  it("returns a valid hex color", () => {
    const result = simulateProtanopia("#FF0000");
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe("simulateDeuteranopia", () => {
  it("returns a valid hex color", () => {
    const result = simulateDeuteranopia("#00FF00");
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe("simulateTritanopia", () => {
  it("returns a valid hex color", () => {
    const result = simulateTritanopia("#0000FF");
    expect(result).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe("simulateAchromatopsia", () => {
  it("returns grayscale for red", () => {
    const result = simulateAchromatopsia("#FF0000");
    const rgb = parseInt(result.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    expect(r).toBe(g);
    expect(g).toBe(b);
  });
});
