import { glob, readFile } from "node:fs/promises";

const call =
  /\bph\(\s*(["'`])((?:\\.|(?!\1)[\s\S])*?)\1\s*,\s*(["'`])((?:\\.|(?!\3)[\s\S])*?)\3\s*,?\s*\)/g;

const entries: { file: string; line: number; value: string; note: string }[] =
  [];

for await (const file of glob("src/**/*.{ts,tsx,astro}")) {
  if (file.endsWith("lib/placeholder.ts")) continue;
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(call)) {
    const line = content.slice(0, match.index).split("\n").length;
    entries.push({ file, line, value: match[2] ?? "", note: match[4] ?? "" });
  }
}

if (entries.length === 0) {
  console.log("Placeholders: none");
} else {
  console.log(`Placeholders: ${entries.length}`);
  for (const entry of entries) {
    console.log(`  ${entry.file}:${entry.line}`);
    console.log(`    ${entry.note}`);
    console.log(`    "${entry.value}"`);
  }
}

if (process.argv.includes("--strict") && entries.length > 0) {
  process.exitCode = 1;
}
