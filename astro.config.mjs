import { defineConfig, envField, fontProviders } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { cn as cnTables } from "cn/vite";
import devGrid from "./integrations/dev-grid/index.ts";
import intentDirective from "./integrations/intent/index.ts";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "http://localhost:4321",
  trailingSlash: "never",
  build: { format: "file" },
  prefetch: false,

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Poppins",
      cssVariable: "--font-poppins",
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      options: {
        variants: [400, 500].map((weight) => ({
          weight,
          style: "normal",
          display: "swap",
          src: [
            `@fontsource/poppins/files/poppins-latin-${weight}-normal.woff2`,
          ],
        })),
      },
    },
  ],

  markdown: {
    processor: satteri({ features: { smartPunctuation: { dashes: false } } }),
  },

  env: {
    schema: {
      PUBLIC_ENV: envField.enum({
        context: "client",
        access: "public",
        values: ["development", "staging", "production"],
        default: "development",
      }),
      PUBLIC_ENABLE_LAB: envField.boolean({
        context: "client",
        access: "public",
        default: false,
      }),
    },
  },

  integrations: [react(), intentDirective(), devGrid()],

  vite: {
    plugins: [
      tailwindcss(),
      cnTables({
        content: ["src/**/*.{ts,tsx,astro}"],
        css: "src/styles/global.css",
        out: "src/lib/cn-tables.ts",
      }),
    ],
  },
});
