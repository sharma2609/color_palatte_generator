import { describe, it, expect } from "vitest";
import {
  complementary,
  analogous,
  triadic,
  splitComplementary,
  tetradic,
  monochromatic,
  generateHarmony,
  generateShadeLadder,
} from "./colorHarmonies.js";

describe("complementary", () => {
  it("returns two colors", () => {
    const result = complementary("#FF0000");
    expect(result).toHaveLength(2);
  });

  it("preserves the base color", () => {
    const result = complementary("#FF0000");
    expect(result[0].toUpperCase()).toBe("#FF0000");
  });
});

describe("analogous", () => {
  it("returns three colors", () => {
    const result = analogous("#FF0000");
    expect(result).toHaveLength(3);
  });

  it("includes the base color in the middle", () => {
    const result = analogous("#FF0000");
    expect(result[1].toUpperCase()).toBe("#FF0000");
  });
});

describe("triadic", () => {
  it("returns three colors", () => {
    const result = triadic("#FF0000");
    expect(result).toHaveLength(3);
  });
});

describe("splitComplementary", () => {
  it("returns three colors", () => {
    const result = splitComplementary("#FF0000");
    expect(result).toHaveLength(3);
  });
});

describe("tetradic", () => {
  it("returns four colors", () => {
    const result = tetradic("#FF0000");
    expect(result).toHaveLength(4);
  });
});

describe("monochromatic", () => {
  it("returns five colors by default", () => {
    const result = monochromatic("#FF0000");
    expect(result).toHaveLength(5);
  });

  it("respects custom count", () => {
    const result = monochromatic("#FF0000", 3);
    expect(result).toHaveLength(3);
  });
});

describe("generateHarmony", () => {
  it("generates complementary palette", () => {
    const result = generateHarmony("#FF0000", "complementary");
    expect(result).toHaveLength(2);
  });

  it("generates triadic palette", () => {
    const result = generateHarmony("#FF0000", "triadic");
    expect(result).toHaveLength(3);
  });

  it("returns fallback for unknown type", () => {
    const result = generateHarmony("#FF0000", "unknown");
    expect(result).toEqual(["#FF0000"]);
  });
});

describe("generateShadeLadder", () => {
  it("returns all 10 shade levels", () => {
    const ladder = generateShadeLadder("#3B82F6");
    expect(Object.keys(ladder)).toHaveLength(10);
  });

  it("includes 500 level matching base", () => {
    const ladder = generateShadeLadder("#3B82F6");
    expect(ladder[500].toUpperCase()).toBe("#3B82F6");
  });
});
