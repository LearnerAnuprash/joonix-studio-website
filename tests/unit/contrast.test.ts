import { describe, expect, it } from "vitest";

import {
  contrastLevel,
  contrastRatio,
  flatten,
  parseRgb,
  type Rgba,
} from "@/lib/contrast";

const ink: Rgba = { r: 31, g: 21, b: 12, a: 1 };
const cream: Rgba = { r: 225, g: 220, b: 201, a: 1 };
const black: Rgba = { r: 0, g: 0, b: 0, a: 1 };
const earth: Rgba = { r: 65, g: 45, b: 21, a: 1 };

const withAlpha = (color: Rgba, a: number): Rgba => ({ ...color, a });

describe("parseRgb", () => {
  it("parses legacy comma syntax", () => {
    expect(parseRgb("rgb(225, 220, 201)")).toEqual(cream);
  });

  it("parses alpha in modern syntax", () => {
    expect(parseRgb("rgb(225 220 201 / 0.7)")).toEqual(withAlpha(cream, 0.7));
  });

  it("parses rgba with percentage alpha", () => {
    expect(parseRgb("rgba(31, 21, 12, 72%)")).toEqual(withAlpha(ink, 0.72));
  });

  it("rejects values it cannot read", () => {
    expect(parseRgb("transparent")).toBeNull();
  });
});

describe("contrastRatio", () => {
  it.each([
    ["cream on ink", cream, ink, 13.05],
    ["cream on black", cream, black, 15.28],
    ["cream on earth", cream, earth, 9.49],
    ["soft cream on ink", withAlpha(cream, 0.7), ink, 6.9],
    ["soft ink on cream", withAlpha(ink, 0.72), cream, 6.05],
    ["strong line on ink", withAlpha(cream, 0.45), ink, 3.6],
    ["strong line on cream", withAlpha(ink, 0.55), cream, 3.62],
    ["hairline on ink", withAlpha(cream, 0.16), ink, 1.49],
    ["earth on ink", earth, ink, 1.38],
  ])("%s", (_, foreground, background, expected) => {
    expect(contrastRatio(foreground, background)).toBeCloseTo(expected, 1);
  });

  it("is symmetric", () => {
    expect(contrastRatio(ink, cream)).toBeCloseTo(contrastRatio(cream, ink), 5);
  });
});

describe("flatten", () => {
  it("returns the bottom colour for a transparent top", () => {
    expect(flatten(withAlpha(cream, 0), ink)).toEqual(ink);
  });
});

describe("contrastLevel", () => {
  it.each([
    [13.05, "AAA"],
    [6.9, "AA"],
    [3.6, "3:1"],
    [1.49, "Below 3:1"],
  ] as const)("%s is %s", (ratio, level) => {
    expect(contrastLevel(ratio)).toBe(level);
  });
});
