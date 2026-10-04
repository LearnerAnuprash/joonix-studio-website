import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { applyTheme, readTheme, subscribeTheme } from "@/lib/theme";
import type { Theme } from "@/styles/palette";

function readServerTheme(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    readServerTheme,
  );
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-pressed={isDark}
      onClick={() => applyTheme(isDark ? "light" : "dark")}
    >
      <SunIcon className="hidden in-data-[theme=dark]:block" />
      <MoonIcon className="hidden in-data-[theme=light]:block" />
      <span className="sr-only">Dark theme</span>
    </Button>
  );
}
