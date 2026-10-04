import { site } from "@/data/site";

export const hero = {
  headlines: [
    "Websites and apps that do their job, built in Nepal.",
    "We design and build websites and apps for businesses that need them to work.",
    "Fast websites and dependable apps for businesses in Nepal and abroad.",
  ],
  intro:
    "Joonix Studio is a software development agency from Silicon Peaks, Nepal. We design, build and look after websites and apps, from a first online shop to a custom platform. Clear prices, a written scope, and a care plan after launch.",
  action: site.cta,
  note: `${site.promises.call} ${site.promises.reply}`,
};

export const home = {
  work: {
    title: "Selected work",
    intro: "A few projects, with the numbers that changed after launch.",
    link: { label: "All case studies", href: "/work" },
  },
  services: {
    title: "What we build",
    intro:
      "Most clients come to us for one of two things. Some need both, and the same team handles them.",
  },
  process: {
    title: "How a project runs",
    intro:
      "The same four steps for a Rs. 15,000 website and a six month app. You always know what happens next and what it costs.",
  },
  proof: {
    title: "Promises you can hold us to",
    intro:
      "We would rather show you numbers we commit to than adjectives about ourselves.",
  },
  pricing: {
    title: "Clear starting points",
    intro:
      "Final quotes depend on scope. Every quote is fixed and written down before work starts.",
    link: { label: "See full pricing", href: "/pricing" },
  },
  posts: {
    title: "From the blog",
    intro: "Straight answers to the questions clients ask us most.",
    link: { label: "All articles", href: "/blog" },
  },
  cta: {
    title: "Tell us what you are building.",
    body: "Book a free 30 minute call. You leave with straight advice, even if we are not the right fit.",
  },
};
