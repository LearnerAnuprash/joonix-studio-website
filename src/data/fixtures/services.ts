import type { Service } from "@/data/types";

export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website design",
    summary:
      "Websites and online shops for businesses in Nepal and abroad. We design around what your customers need to find, build it to load fast on any phone, and set it up so your team can edit it without calling us.",
    answer:
      "Joonix Studio designs and builds websites and online shops for businesses in Nepal and abroad. Prices start at Rs. 15,000 for a small business site. Every build is mobile-first, fast on a 4G connection, and comes with an admin your team can use, on-page SEO, and an optional monthly care plan.",
    highlights: [
      "Design made for your brand",
      "Mobile-first build that loads fast",
      "eSewa, Khalti and card payments",
      "On-page SEO and analytics",
      "An admin your team can use",
    ],
    audience: [
      {
        title: "Small businesses getting online",
        body: "You need a clear site with your services, prices and a way to reach you on WhatsApp. This is the Launch plan.",
      },
      {
        title: "Shops ready to sell more",
        body: "You sell through Instagram or a shop counter and want orders, payments and stock in one place. This is the Scale plan.",
      },
      {
        title: "Platforms and funded startups",
        body: "You need customer accounts, integrations and a design system that holds up as your team grows. This is the Custom plan.",
      },
    ],
    scope: [
      {
        title: "Discovery and structure",
        body: "We map your pages, products and the questions customers ask before they buy.",
      },
      {
        title: "Design",
        body: "Layouts made for your brand and your content, reviewed with you on a private preview link.",
      },
      {
        title: "Build",
        body: "Mobile-first pages that load fast on a 4G connection and pass accessibility checks.",
      },
      {
        title: "Payments and orders",
        body: "eSewa, Khalti and card payments, order emails and status tracking on the Scale and Custom plans.",
      },
      {
        title: "Content and SEO",
        body: "Page titles, descriptions, structured data and a sitemap, so search engines read the site correctly.",
      },
      {
        title: "Handover",
        body: "A short training session and a written guide, so your team can edit pages and products on its own.",
      },
    ],
    deliverables: [
      "Sitemap and page plan",
      "Design for every page template",
      "Production website on your domain",
      "Admin access and a written editing guide",
      "Analytics and Search Console set up",
      "Source code in a repository you own",
    ],
    tech: [
      { group: "Websites", items: ["Astro", "React", "Tailwind CSS"] },
      { group: "Online shops", items: ["Shopify", "Custom checkout"] },
      { group: "Content", items: ["Git-based CMS", "Headless CMS"] },
      { group: "Hosting", items: ["AWS", "Cloudflare"] },
    ],
    priceFrom: 15000,
    priceNote:
      "Launch from Rs. 15,000, Scale from Rs. 60,000, Custom from Rs. 1,50,000. Final quotes depend on scope.",
    faqs: [
      {
        question: "How long does a website take?",
        answer:
          "A Launch site takes 2 to 3 weeks. A Scale shop takes 4 to 6 weeks. Custom builds are scheduled in the written scope. You see progress every week on a private preview link.",
      },
      {
        question: "Can we edit the site ourselves?",
        answer:
          "Yes. Every site comes with an admin for pages, products and orders. We train your team at launch and leave a written guide.",
      },
      {
        question: "Do you work with businesses outside Nepal?",
        answer:
          "Yes. Nepal Time is UTC+5:45, so our working day overlaps with Europe, the Gulf, India and Australia. We work over email, video calls and a shared project board.",
      },
      {
        question: "Who owns the website?",
        answer:
          "You do. The domain is registered in your name and the code and content are yours. If you leave the care plan, we hand everything over.",
      },
    ],
    order: 1,
  },
  {
    slug: "application-development",
    title: "Application development",
    summary:
      "Web and mobile apps for teams that have outgrown spreadsheets and off-the-shelf tools. We scope the first version with you, build it in weekly steps, and stay on to run and improve it.",
    answer:
      "Joonix Studio builds web and mobile apps for businesses that have outgrown spreadsheets and off-the-shelf tools. Projects start from Rs. 1,00,000 and are scoped after a free discovery call. You get a fixed written scope, weekly previews, and the code in a repository you own.",
    highlights: [
      "Written scope before any code",
      "Web apps, portals and dashboards",
      "iOS and Android from one codebase",
      "Payment and accounting integrations",
      "Hosting, monitoring and backups",
    ],
    audience: [
      {
        title: "Operations run on spreadsheets",
        body: "Bookings, stock or field reports live in shared sheets and WhatsApp groups, and the mistakes are getting expensive.",
      },
      {
        title: "Products that need an app",
        body: "Your customers want to order, book or track something from their phone, and a website alone does not cover it.",
      },
      {
        title: "Startups building a first version",
        body: "You need a focused first release that real users can try, built so it can grow when they ask for more.",
      },
    ],
    scope: [
      {
        title: "Discovery and scope",
        body: "We turn your process into a written list of screens, roles and rules, with a fixed price.",
      },
      {
        title: "Interface design",
        body: "Clickable designs for the main flows, tested with the people who will use them every day.",
      },
      {
        title: "Web apps",
        body: "Dashboards, customer portals and internal tools that work in any modern browser.",
      },
      {
        title: "Mobile apps",
        body: "iOS and Android apps from one codebase, published to the App Store and Google Play.",
      },
      {
        title: "Integrations",
        body: "Payments, SMS, accounting and delivery services connected through their APIs.",
      },
      {
        title: "Run and improve",
        body: "Hosting, monitoring, backups and a monthly plan for fixes and new features.",
      },
    ],
    deliverables: [
      "Written scope with screens, roles and rules",
      "Clickable designs for the main flows",
      "Web app, mobile apps or both",
      "Admin panel for your team",
      "Hosting with monitoring and backups",
      "Source code and documentation you own",
    ],
    tech: [
      { group: "Web", items: ["React", "TypeScript", "Node.js"] },
      { group: "Mobile", items: ["React Native", "Expo"] },
      { group: "Data", items: ["PostgreSQL", "DynamoDB"] },
      { group: "Cloud", items: ["AWS"] },
    ],
    priceFrom: 100000,
    priceNote:
      "Web and mobile apps from Rs. 1,00,000, scoped after a free discovery call.",
    faqs: [
      {
        question: "How much does an app cost?",
        answer:
          "Apps start from Rs. 1,00,000. The final price depends on the number of screens, user roles and integrations. After the discovery call you get a written scope with a fixed price.",
      },
      {
        question: "How long does the first version take?",
        answer:
          "Most first versions take 6 to 12 weeks. We agree the scope first, then ship in weekly steps you can try on a preview link.",
      },
      {
        question: "Can you take over an app someone else built?",
        answer:
          "Often, yes. We start with a paid code review, tell you plainly what we found, and then quote for fixes or new work.",
      },
      {
        question: "Will you sign an NDA?",
        answer:
          "Yes. We are happy to sign a mutual NDA before the discovery call.",
      },
    ],
    order: 2,
  },
];
