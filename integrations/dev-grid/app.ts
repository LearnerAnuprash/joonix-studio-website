import { defineToolbarApp } from "astro/toolbar";

const OVERLAY_ID = "joonix-dev-grid";

const css = `
#${OVERLAY_ID} { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none;
  background-image: repeating-linear-gradient(to bottom, transparent 0 7px, rgb(255 0 128 / 0.12) 7px 8px); }
#${OVERLAY_ID} .page-width, #${OVERLAY_ID} .page-grid { height: 100%; }
#${OVERLAY_ID} .col { background: rgb(255 0 128 / 0.08); box-shadow: inset 1px 0 rgb(255 0 128 / 0.35), inset -1px 0 rgb(255 0 128 / 0.35); }
#${OVERLAY_ID} .col:nth-child(n + 5) { display: none; }
@media (min-width: 48rem) { #${OVERLAY_ID} .col:nth-child(n + 5) { display: block; } #${OVERLAY_ID} .col:nth-child(n + 9) { display: none; } }
@media (min-width: 64rem) { #${OVERLAY_ID} .col:nth-child(n + 9) { display: block; } }
`;

function buildOverlay(): HTMLElement {
  const root = document.createElement("div");
  root.id = OVERLAY_ID;
  root.setAttribute("aria-hidden", "true");
  const style = document.createElement("style");
  style.textContent = css;
  const container = document.createElement("div");
  container.className = "page-width";
  const grid = document.createElement("div");
  grid.className = "page-grid";
  for (let i = 0; i < 12; i++) {
    const col = document.createElement("div");
    col.className = "col";
    grid.append(col);
  }
  container.append(grid);
  root.append(style, container);
  return root;
}

export default defineToolbarApp({
  init(_canvas, app) {
    app.onToggled(({ state }) => {
      document.getElementById(OVERLAY_ID)?.remove();
      if (state) document.body.append(buildOverlay());
    });
  },
});
