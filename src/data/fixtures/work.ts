import type { CaseStudy } from "@/data/types";

export const work: CaseStudy[] = [
  {
    slug: "joonix-studio-website",
    title: "A studio website that edits like a document",
    client: "Joonix Studio",
    year: 2026,
    services: ["website-design"],
    stack: ["Astro", "React", "Tailwind CSS", "Decap CMS", "AWS"],
    summary:
      "Our own website: a static site with a Git-based CMS, an answer-first blog and a contact pipeline on AWS.",
    result:
      "Every page prerendered, with a JavaScript budget of 100 KB per page.",
    metrics: [
      { value: "0", label: "layout shift budget on every template" },
      { value: "100 KB", label: "JavaScript cap on any page" },
      { value: "2", label: "themes, each designed on its own" },
    ],
    problem:
      "We needed a site that explains our prices plainly, ranks for the questions clients ask, and can be edited by people who do not write code. Most agency sites we looked at were slow on a phone and hid their prices.",
    approach:
      "We designed a small system first: four colours, one typeface, a 12 column grid and fine rules instead of heavy cards. Pages are prerendered with Astro, interactive parts load as small React islands, and content lives in Markdown that editors change through a CMS.",
    outcome:
      "Pages render as static HTML from a CDN, the blog follows an answer-first pattern for search and AI assistants, and every enquiry lands in the team inbox and a database.",
    cover: {
      alt: "Joonix Studio home page in the dark theme",
      caption: "Home page in the dark theme",
      ratio: "16 / 10",
    },
    screenshots: [
      {
        alt: "Pricing page with three plan cards",
        caption: "Pricing page with the Scale plan emphasised",
        ratio: "16 / 10",
      },
      {
        alt: "Blog post with a short answer and table of contents",
        caption: "An answer-first blog post",
        ratio: "4 / 3",
      },
      {
        alt: "Contact form on a phone",
        caption: "Contact form on a phone",
        ratio: "9 / 16",
      },
    ],
    featured: true,
    draft: true,
    order: 1,
  },
];
