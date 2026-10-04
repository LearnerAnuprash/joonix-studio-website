import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

export default function intentDirective(): AstroIntegration {
  return {
    name: "joonix:intent-directive",
    hooks: {
      "astro:config:setup": ({ addClientDirective }) => {
        addClientDirective({
          name: "intent",
          entrypoint: fileURLToPath(new URL("./directive.ts", import.meta.url)),
        });
      },
    },
  };
}
