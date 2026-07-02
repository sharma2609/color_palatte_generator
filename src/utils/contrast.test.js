import { describe, it, expect } from "vitest";
import { getLuminance, getContrastRatio, getWCAGGrade } from "./contrast.js";

describe("getLuminance", () => {
  it("white has high luminance", () => {
    const l = getLuminance("#FFFFFF");
    expect(l).toBeCloseTo(1, 2);
  });

  it("black has zero luminance", () => {
    const l = getLuminance("#000000");
    expect(l).toBeCloseTo(0, 2);
  });
});

describe("getContrastRatio", () => {
  it("black on white has high ratio", () => {
    const ratio = getContrastRatio("#000000", "#FFFFFF");
    expect(ratio).toBeGreaterThan(20);
  });

  it("same colors have ratio 1", () => {
    const ratio = getContrastRatio("#FF0000", "#FF0000");
    expect(ratio).toBeCloseTo(1, 1);
  });
});

describe("getWCAGGrade", () => {
  it("ratio 21 is AAA", () => {
    expect(getWCAGGrade(21)).toBe("AAA");
  });

  it("ratio 5 is AA", () => {
    expect(getWCAGGrade(5, false)).toBe("AA");
  });

  it("ratio 2 is Fail", () => {
    expect(getWCAGGrade(2)).toBe("Fail");
  });

  it("ratio 3.5 is AA for large text", () => {
    expect(getWCAGGrade(3.5, true)).toBe("AA");
  });

  it("ratio 7 is AAA for large text", () => {
    expect(getWCAGGrade(7, true)).toBe("AAA");
  });
});
