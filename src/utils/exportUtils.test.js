import { describe, it, expect } from "vitest";
import {
  toCSSVariables,
  toTailwindConfig,
  toSCSSVariables,
  toJSON,
} from "./exportUtils.js";

const palette = ["#FF0000", "#00FF00", "#0000FF"];

describe("toCSSVariables", () => {
  it("generates CSS variable declarations", () => {
    const result = toCSSVariables(palette);
    expect(result).toContain("--color-1: #FF0000;");
    expect(result).toContain("--color-2: #00FF00;");
    expect(result).toContain("--color-3: #0000FF;");
  });
});

describe("toTailwindConfig", () => {
  it("generates tailwind config", () => {
    const result = toTailwindConfig(palette);
    expect(result).toContain("module.exports");
    expect(result).toContain("color1: \"#FF0000\"");
  });
});

describe("toSCSSVariables", () => {
  it("generates SCSS variables", () => {
    const result = toSCSSVariables(palette);
    expect(result).toContain("$primary: #FF0000;");
    expect(result).toContain("$color-2: #00FF00;");
  });
});

describe("toJSON", () => {
  it("generates valid JSON", () => {
    const result = toJSON(palette);
    expect(JSON.parse(result)).toEqual(palette);
  });
});
