import { parseArgs } from "node:util";
import { chromium } from "@playwright/test";

import {
  contrastLevel,
  contrastRatio,
  flatten,
  parseRgb,
} from "../src/lib/contrast.ts";

const { values } = parseArgs({
  options: {
    base: { type: "string", default: "http://localhost:4322" },
  },
});

const themes = ["dark", "light"] as const;
const tones = ["base", "deep", "inverse", "black"] as const;
const tokens = [
  "background",
  "foreground",
  "muted-foreground",
  "input",
  "border",
  "ring",
  "primary",
  "primary-foreground",
] as const;

type Token = (typeof tokens)[number];

const pairs: { label: string; fg: Token; bg: Token; min: number }[] = [
  { label: "Text", fg: "foreground", bg: "background", min: 4.5 },
  { label: "Soft text", fg: "muted-foreground", bg: "background", min: 4.5 },
  { label: "Control border", fg: "input", bg: "background", min: 3 },
  { label: "Focus ring", fg: "ring", bg: "background", min: 3 },
  { label: "Button label", fg: "primary-foreground", bg: "primary", min: 4.5 },
  { label: "Hairline (decorative)", fg: "border", bg: "background", min: 0 },
];

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.goto(values.base);

const measured = await page.evaluate(
  ({ themes, tones, tokens }) => {
    const out: Record<string, Record<string, string>> = {};
    for (const theme of themes) {
      for (const tone of tones) {
        const wrap = document.createElement("div");
        wrap.dataset.theme = theme;
        const toneEl = document.createElement("div");
        toneEl.dataset.tone = tone;
        wrap.append(toneEl);
        document.body.append(wrap);
        const colours: Record<string, string> = {};
        for (const token of tokens) {
          const probe = document.createElement("span");
          probe.style.color = `var(--${token})`;
          toneEl.append(probe);
          colours[token] = getComputedStyle(probe).color;
        }
        out[`${theme}/${tone}`] = colours;
        wrap.remove();
      }
    }
    return out;
  },
  { themes: [...themes], tones: [...tones], tokens: [...tokens] },
);

await browser.close();

const lines = [
  "| Theme | Tone | Pairing | Ratio | Result |",
  "| --- | --- | --- | --- | --- |",
];
let failed = false;

for (const theme of themes) {
  for (const tone of tones) {
    const colours = measured[`${theme}/${tone}`];
    if (!colours) continue;
    const background = parseRgb(colours.background ?? "");
    if (!background) continue;
    for (const pair of pairs) {
      const fg = parseRgb(colours[pair.fg] ?? "");
      const bgRaw = parseRgb(colours[pair.bg] ?? "");
      if (!fg || !bgRaw) continue;
      const bg = bgRaw.a < 1 ? flatten(bgRaw, background) : bgRaw;
      const ratio = contrastRatio(fg, bg);
      const passes = ratio >= pair.min;
      failed ||= !passes;
      const result =
        pair.min === 0
          ? "Decorative only"
          : passes
            ? contrastLevel(ratio)
            : "Fails";
      lines.push(
        `| ${theme} | ${tone} | ${pair.label} | ${ratio.toFixed(2)}:1 | ${result} |`,
      );
    }
  }
}

console.log(lines.join("\n"));
process.exitCode = failed ? 1 : 0;
