import { report, sourceLines } from "./lib/files.ts";

const bannedPhrases = [
  "elevate",
  "unlock",
  "seamless",
  "seamlessly",
  "cutting-edge",
  "in today's fast-paced world",
  "leverage",
  "game-changer",
  "game changer",
  "empower",
  "world-class",
  "next-level",
  "best-in-class",
  "revolutionize",
  "revolutionise",
  "supercharge",
  "synergy",
  "robust",
  "innovative",
  "one-stop shop",
  "delve",
];

const rules: { name: string; pattern: RegExp }[] = [
  { name: "em dash", pattern: /\u2014/ },
  {
    name: "not just X, but Y",
    pattern: /\bnot (just|only)\b[^.]{0,80}\bbut\b/i,
  },
  ...bannedPhrases.map((phrase) => ({
    name: `banned phrase "${phrase}"`,
    pattern: new RegExp(`\\b${phrase.replace(/[-']/g, "[-' ]?")}\\b`, "i"),
  })),
];

const findings: string[] = [];

for await (const { file, line, text } of sourceLines(
  ["src/**/*.{astro,ts,tsx,md,mdx,yaml,yml,json}"],
  (file) => file.endsWith("cn-tables.ts"),
)) {
  for (const rule of rules) {
    if (rule.pattern.test(text)) findings.push(`${file}:${line} ${rule.name}`);
  }
}

process.exitCode = report("Copy lint", findings);
