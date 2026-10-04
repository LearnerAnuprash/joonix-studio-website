import type { AstroComponentFactory } from "astro/runtime/server/index.js";

import Foundations from "./Foundations.astro";
import HeroLab from "./HeroLab.astro";
import LabIndex from "./LabIndex.astro";

export type LabPage = {
  slug: string | undefined;
  title: string;
  summary: string;
  component: AstroComponentFactory;
  props?: Record<string, unknown>;
};

export const labPages: LabPage[] = [
  {
    slug: undefined,
    title: "Lab",
    summary: "",
    component: LabIndex,
  },
  {
    slug: "foundations",
    title: "Foundations",
    summary: "Palette, themes and tones, type, spacing, focus, grid and icons.",
    component: Foundations,
  },
  {
    slug: "hero/ridge",
    title: "Hero, ridge",
    summary: "Display headline across ten columns with the ridge line below.",
    component: HeroLab,
    props: { variant: "ridge", title: "Hero, ridge" },
  },
  {
    slug: "hero/work",
    title: "Hero, work first",
    summary:
      "Headline beside a large project screenshot that runs off the edge.",
    component: HeroLab,
    props: { variant: "work", title: "Hero, work first" },
  },
];
