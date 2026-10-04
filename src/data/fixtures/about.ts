import type { Point } from "@/data/types";

export const about = {
  title: "About Joonix Studio",
  intro:
    "We are a small software studio in Kathmandu. We design, build and look after websites and apps for businesses in Nepal and abroad.",
  story: [
    "Joonix Studio started from a simple observation: most businesses cannot tell what they are paying for. Quotes arrive as a single number, timelines slip, and when the project ends nobody on the client's side can change a price or add a product.",
    "We work the other way round. Every project starts with a written scope and a fixed price. You see the work every week on a private link. At launch your team learns how to run the site, and the code, content and domain are yours.",
    "We build for small and growing businesses: shops moving from Instagram to their own checkout, service companies that need to be found on Google, and teams replacing spreadsheets with an app.",
  ],
  siliconPeaks: {
    title: "From Silicon Peaks",
    intro:
      "Silicon Peaks is the name Nepal's tech community uses for itself: developers, designers and founders building software from Kathmandu and beyond. It is where we work, and it shapes how we work with clients.",
    points: [
      {
        title: "Working hours that overlap",
        body: "Nepal Time is UTC+5:45. Our day overlaps fully with India and the Gulf, with the European morning and with the Australian afternoon.",
      },
      {
        title: "Prices set by local costs",
        body: "We are a Kathmandu team with Kathmandu costs. You pay for senior work without paying for an expensive office abroad.",
      },
      {
        title: "People you can talk to",
        body: "We hire and train locally and keep the team small, so you talk to the people doing the work, not a sales layer.",
      },
    ] satisfies Point[],
  },
  principles: {
    title: "How we make decisions",
    items: [
      {
        title: "Write it down",
        body: "Scope, price, timeline and decisions live in writing, so nobody has to remember what was agreed.",
      },
      {
        title: "Show the work every week",
        body: "You see real progress on a preview link, not a status report.",
      },
      {
        title: "Phone first",
        body: "Most of your customers will visit on a phone over mobile data. We design and test for that first.",
      },
      {
        title: "You stay in control",
        body: "Your domain, your code, your content. You can leave at any time and take everything with you.",
      },
      {
        title: "Straight advice",
        body: "If a template, a website builder or another studio fits you better, we say so on the first call.",
      },
    ] satisfies Point[],
  },
  howWeWork: {
    title: "How we work with you",
    items: [
      {
        title: "One person who owns your project",
        body: "Email and WhatsApp for quick questions, a short video call every week, and one name to ask about anything.",
      },
      {
        title: "Everything in one place",
        body: "A shared project board, a private preview link for every change, and the code in a Git repository you own.",
      },
    ] satisfies Point[],
  },
  team: [] as Point[],
};
