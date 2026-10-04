import { report, sourceLines } from "./lib/files.ts";

const allowed = new Set(["src/styles/tokens.css", "src/styles/palette.ts"]);

const rules: { name: string; pattern: RegExp }[] = [
  {
    name: "raw hex colour",
    pattern: /(?<![\w&/-])#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b/i,
  },
  {
    name: "raw colour function",
    pattern: /\b(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\(/i,
  },
  {
    name: "arbitrary colour class",
    pattern: /-\[(?:#|rgba?\(|hsla?\(|oklch\(|color\()/i,
  },
  {
    name: "default Tailwind palette",
    pattern:
      /\b(?:bg|text|border|fill|stroke|ring|outline|from|to|via)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white)\b/,
  },
];

const findings: string[] = [];

for await (const { file, line, text } of sourceLines(
  ["src/**/*.{astro,ts,tsx,css}"],
  (file) => allowed.has(file) || file.endsWith("cn-tables.ts"),
)) {
  for (const rule of rules) {
    if (rule.pattern.test(text)) findings.push(`${file}:${line} ${rule.name}`);
  }
}

process.exitCode = report("Token lint", findings);
