export type Rgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type ContrastLevel = "AAA" | "AA" | "3:1" | "Below 3:1";

export function parseRgb(value: string): Rgba | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match?.[1]) return null;
  const parts = match[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map((part) =>
      part.endsWith("%") ? Number.parseFloat(part) / 100 : Number(part),
    );
  const [r, g, b, a = 1] = parts;
  if (
    [r, g, b].some((channel) => channel === undefined || Number.isNaN(channel))
  ) {
    return null;
  }
  return { r: r as number, g: g as number, b: b as number, a };
}

export function flatten(top: Rgba, bottom: Rgba): Rgba {
  const a = top.a;
  return {
    r: Math.round(top.r * a + bottom.r * (1 - a)),
    g: Math.round(top.g * a + bottom.g * (1 - a)),
    b: Math.round(top.b * a + bottom.b * (1 - a)),
    a: 1,
  };
}

function channel(value: number): number {
  const v = value / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

export function luminance({ r, g, b }: Rgba): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foreground: Rgba, background: Rgba): number {
  const solidBackground =
    background.a < 1
      ? flatten(background, { r: 0, g: 0, b: 0, a: 1 })
      : background;
  const solidForeground =
    foreground.a < 1 ? flatten(foreground, solidBackground) : foreground;
  const l1 = luminance(solidForeground);
  const l2 = luminance(solidBackground);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function contrastLevel(ratio: number): ContrastLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "3:1";
  return "Below 3:1";
}
