import { mkdir, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { chromium } from "@playwright/test";

const { values } = parseArgs({
  options: {
    base: { type: "string", default: "http://localhost:4321" },
    round: { type: "string", default: "1" },
    routes: { type: "string" },
  },
});

const defaultRoutes = [
  "/",
  "/lab",
  "/lab/foundations",
  "/lab/hero/ridge",
  "/lab/hero/work",
];

const routes = values.routes ? values.routes.split(",") : defaultRoutes;
const widths = [360, 768, 1024, 1440];
const themes = ["dark", "light"] as const;
const outDir = `review/round-${values.round}`;

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL ?? "chrome",
});

const shots: { route: string; width: number; theme: string; file: string }[] =
  [];

for (const theme of themes) {
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  await context.addInitScript((value) => {
    localStorage.setItem("theme", value);
  }, theme);
  const page = await context.newPage();

  for (const route of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(new URL(route, values.base).href, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      const slug =
        route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");
      const file = `${slug}-${width}-${theme}.png`;
      await page.screenshot({ path: `${outDir}/${file}`, fullPage: true });
      shots.push({ route, width, theme, file });
    }
  }

  await context.close();
}

await browser.close();

const rows = routes
  .map((route) => {
    const cells = themes
      .flatMap((theme) =>
        widths.map((width) => {
          const shot = shots.find(
            (item) =>
              item.route === route &&
              item.width === width &&
              item.theme === theme,
          );
          return shot
            ? `<figure><a href="${shot.file}"><img src="${shot.file}" loading="lazy" alt=""></a><figcaption>${width} ${theme}</figcaption></figure>`
            : "";
        }),
      )
      .join("");
    return `<section><h2>${route}</h2><div class="row">${cells}</div></section>`;
  })
  .join("");

const html = `<!doctype html><meta charset="utf-8"><title>Review round ${values.round}</title><style>body{font:14px system-ui;margin:24px;background:#111;color:#eee}h2{font-weight:500}.row{display:flex;gap:16px;align-items:flex-start;overflow-x:auto}figure{margin:0}img{width:180px;border:1px solid #333}figcaption{margin-top:4px;color:#999}</style><h1>Review round ${values.round}</h1>${rows}`;

await writeFile(`${outDir}/index.html`, html);

console.log(`${shots.length} screenshots in ${outDir}`);
