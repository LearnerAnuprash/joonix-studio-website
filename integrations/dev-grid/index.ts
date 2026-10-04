import type { AstroIntegration } from "astro";

const icon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 3v18M9 3v18M15 3v18M20 3v18"/></svg>';

export default function devGrid(): AstroIntegration {
  return {
    name: "joonix:dev-grid",
    hooks: {
      "astro:config:setup": ({ addDevToolbarApp, command }) => {
        if (command !== "dev") return;
        addDevToolbarApp({
          id: "joonix-grid",
          name: "Grid overlay",
          icon,
          entrypoint: new URL("./app.ts", import.meta.url),
        });
      },
    },
  };
}
