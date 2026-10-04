import { defineConfig, envField, fontProviders } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { cn as cnTables } from "cn/vite";
import devGrid from "./integrations/dev-grid/index.ts";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "http://localhost:4321",
  trailingSlash: "never",
  build: { format: "file" },
  prefetch: false,

  fonts: [
    {
      provider: fontProviders.npm(),
      name: "Poppins",
      cssVariable: "--font-poppins",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      display: "swap",
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
      options: { package: "@fontsource/poppins" },
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

  integrations: [react(), devGrid()],

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
