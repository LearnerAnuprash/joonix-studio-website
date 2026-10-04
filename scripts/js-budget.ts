import { glob, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { gzipSync } from "node:zlib";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    dist: { type: "string", default: "dist" },
    js: { type: "string", default: "100" },
    css: { type: "string", default: "25" },
    lab: { type: "boolean", default: false },
  },
});

const dist = values.dist;
const jsLimit = Number(values.js) * 1024;
const cssLimit = Number(values.css) * 1024;
const sizes = new Map<string, number>();
const imports = new Map<string, string[]>();

async function gzipSize(path: string): Promise<number> {
  const cached = sizes.get(path);
  if (cached !== undefined) return cached;
  const size = gzipSync(await readFile(path)).length;
  sizes.set(path, size);
  return size;
}

function resolve(from: string, specifier: string): string {
  if (specifier.startsWith("/")) return join(dist, specifier);
  return join(dirname(from), specifier);
}

async function staticImports(path: string): Promise<string[]> {
  const cached = imports.get(path);
  if (cached) return cached;
  const source = await readFile(path, "utf8");
  const found = [
    ...source.matchAll(
      /(?:import|export)\s*(?:[\w${},\s*]*?from\s*)?["']([^"']+\.js)["']/g,
    ),
  ].map((match) => resolve(path, match[1] ?? ""));
  imports.set(path, found);
  return found;
}

async function closure(entries: string[]): Promise<Set<string>> {
  const seen = new Set<string>();
  const queue = [...entries];
  while (queue.length > 0) {
    const next = queue.pop();
    if (!next || seen.has(next)) continue;
    try {
      await stat(next);
    } catch {
      continue;
    }
    seen.add(next);
    queue.push(...(await staticImports(next)));
  }
  return seen;
}

const rows: { page: string; js: number; css: number }[] = [];

for await (const file of glob(`${dist}/**/*.html`)) {
  if (!values.lab && file.includes(`${dist}/lab`)) continue;
  const html = await readFile(file, "utf8");
  const jsEntries = [
    ...html.matchAll(
      /(?:component-url|renderer-url|src)="(\/_astro\/[^"]+\.js)"/g,
    ),
  ].map((match) => join(dist, match[1] ?? ""));
  const cssFiles = [...html.matchAll(/href="(\/_astro\/[^"]+\.css)"/g)].map(
    (match) => join(dist, match[1] ?? ""),
  );
  let js = 0;
  for (const path of await closure(jsEntries)) js += await gzipSize(path);
  let css = 0;
  for (const path of new Set(cssFiles)) css += await gzipSize(path);
  rows.push({ page: file.slice(dist.length), js, css });
}

rows.sort((a, b) => b.js - a.js);
const kb = (bytes: number) => `${(bytes / 1024).toFixed(1)} KB`;
let failed = false;
for (const row of rows) {
  const over = row.js > jsLimit || row.css > cssLimit;
  failed ||= over;
  console.log(
    `${over ? "over" : "ok  "}  js ${kb(row.js).padStart(9)}  css ${kb(row.css).padStart(8)}  ${row.page}`,
  );
}
console.log(
  `Budget: ${values.js} KB JS and ${values.css} KB CSS per page, gzip. Pages: ${rows.length}.`,
);
process.exitCode = failed ? 1 : 0;
