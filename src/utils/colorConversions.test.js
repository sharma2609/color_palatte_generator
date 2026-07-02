import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  formatRgb,
  formatHsl,
} from "./colorConversions.js";

describe("hexToRgb", () => {
  it("converts #FF0000 to red", () => {
    expect(hexToRgb("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("converts #000000 to black", () => {
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("returns null for invalid input", () => {
    expect(hexToRgb("invalid")).toBeNull();
  });
});

describe("rgbToHex", () => {
  it("converts rgb to hex", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
  });

  it("pads single digits", () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });
});

describe("rgbToHsl", () => {
  it("converts red to hsl 0, 100, 50", () => {
    const hsl = rgbToHsl(255, 0, 0);
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);
  });

  it("converts white to hsl 0, 0, 100", () => {
    const hsl = rgbToHsl(255, 255, 255);
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(0);
    expect(hsl.l).toBe(100);
  });

  it("converts black to hsl 0, 0, 0", () => {
    const hsl = rgbToHsl(0, 0, 0);
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(0);
    expect(hsl.l).toBe(0);
  });
});

describe("hslToRgb", () => {
  it("converts hsl 0, 100, 50 to red", () => {
    const rgb = hslToRgb(0, 100, 50);
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it("roundtrip rgb -> hsl -> rgb preserves values", () => {
    const { r, g, b } = hslToRgb(0, 100, 50);
    expect(r).toBe(255);
    expect(g).toBe(0);
    expect(b).toBe(0);
  });
});

describe("formatRgb", () => {
  it("formats rgb string", () => {
    expect(formatRgb(255, 0, 0)).toBe("rgb(255, 0, 0)");
  });
});

describe("formatHsl", () => {
  it("formats hsl string", () => {
    expect(formatHsl(0, 100, 50)).toBe("hsl(0, 100%, 50%)");
  });
});
