import type { ClientDirective } from "astro";

const islandEvents = ["pointerover", "pointerdown", "touchstart", "focusin"];
const pageEvents = ["scroll", "keydown", "pointerdown", "touchstart"];
const FALLBACK_DELAY = 3000;

const intent: ClientDirective = (load, _options, el) => {
  let started = false;
  let hydrated = false;
  let timer = 0;
  let pending: HTMLElement | null = null;

  const capture = (event: Event) => {
    if (hydrated) return;
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest<HTMLElement>("button");
    if (button && el.contains(button)) pending = button;
  };

  const detach = () => {
    for (const name of islandEvents) el.removeEventListener(name, hydrate);
    for (const name of pageEvents) window.removeEventListener(name, hydrate);
    window.removeEventListener("load", schedule);
    window.clearTimeout(timer);
  };

  async function hydrate() {
    if (started) return;
    started = true;
    detach();
    const run = await load();
    await run();
    hydrated = true;
    el.removeEventListener("click", capture, true);
    const replay = pending;
    pending = null;
    replay?.click();
  }

  function schedule() {
    timer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => void hydrate(), { timeout: 2000 });
      } else {
        void hydrate();
      }
    }, FALLBACK_DELAY);
  }

  el.addEventListener("click", capture, true);
  for (const name of islandEvents) {
    el.addEventListener(name, hydrate, { once: true, passive: true });
  }
  for (const name of pageEvents) {
    window.addEventListener(name, hydrate, { once: true, passive: true });
  }
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
};

export default intent;
