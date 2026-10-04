import { glob, readFile } from "node:fs/promises";

export type SourceLine = {
  file: string;
  line: number;
  text: string;
};

export async function* sourceLines(
  patterns: string[],
  exclude: (file: string) => boolean = () => false,
): AsyncGenerator<SourceLine> {
  for (const pattern of patterns) {
    for await (const file of glob(pattern)) {
      if (exclude(file)) continue;
      const content = await readFile(file, "utf8");
      const lines = content.split("\n");
      for (const [index, text] of lines.entries()) {
        yield { file, line: index + 1, text };
      }
    }
  }
}

export function report(title: string, findings: string[]): number {
  if (findings.length === 0) {
    console.log(`${title}: clean`);
    return 0;
  }
  console.error(`${title}: ${findings.length} problem(s)`);
  for (const finding of findings) console.error(`  ${finding}`);
  return 1;
}
