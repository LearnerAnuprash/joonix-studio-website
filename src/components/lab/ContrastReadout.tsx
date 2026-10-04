import { useRef, useSyncExternalStore } from "react";

import {
  contrastLevel,
  contrastRatio,
  flatten,
  parseRgb,
  type Rgba,
} from "@/lib/contrast";
import { subscribeTheme } from "@/lib/theme";

type Pair = {
  label: string;
  foreground: string;
  background: string;
};

type Reading = {
  label: string;
  ratio: number;
};

const pairs: Pair[] = [
  { label: "Text", foreground: "--foreground", background: "--background" },
  {
    label: "Body",
    foreground: "--muted-foreground",
    background: "--background",
  },
  {
    label: "Control border",
    foreground: "--input",
    background: "--background",
  },
  { label: "Hairline", foreground: "--border", background: "--background" },
  {
    label: "Button",
    foreground: "--primary-foreground",
    background: "--primary",
  },
];

function resolveColor(scope: HTMLElement, variable: string): Rgba | null {
  const probe = document.createElement("span");
  probe.style.color = `var(${variable})`;
  probe.hidden = true;
  scope.append(probe);
  const color = parseRgb(getComputedStyle(probe).color);
  probe.remove();
  return color;
}

function measure(scope: HTMLElement): Reading[] {
  const page = resolveColor(scope, "--background");
  if (!page) return [];
  return pairs.flatMap(({ label, foreground, background }) => {
    const fg = resolveColor(scope, foreground);
    const bg = resolveColor(scope, background);
    if (!fg || !bg) return [];
    const solidBackground = bg.a < 1 ? flatten(bg, page) : bg;
    return [
      { label, ratio: Number(contrastRatio(fg, solidBackground).toFixed(2)) },
    ];
  });
}

function readServerSnapshot() {
  return "[]";
}

export function ContrastReadout() {
  const ref = useRef<HTMLDListElement>(null);
  const snapshot = useSyncExternalStore(
    subscribeTheme,
    () => {
      const scope = ref.current?.closest<HTMLElement>("[data-tone]");
      return scope ? JSON.stringify(measure(scope)) : "[]";
    },
    readServerSnapshot,
  );
  const readings = JSON.parse(snapshot) as Reading[];

  return (
    <dl
      ref={ref}
      className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 text-caption"
    >
      {readings.map(({ label, ratio }) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="text-right tabular-nums">{ratio.toFixed(2)}:1</dd>
          <dd className="text-muted-foreground">{contrastLevel(ratio)}</dd>
        </div>
      ))}
    </dl>
  );
}
