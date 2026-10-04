import type { Pricing } from "@/data/types";
import { ph } from "@/lib/placeholder";

export const pricing: Pricing = {
  title: "Pricing",
  intro: "Clear starting points. Final quotes depend on scope.",
  plans: [
    {
      id: "launch",
      name: "Launch",
      audience: "For small businesses getting online.",
      setupMin: 15000,
      setupMax: 35000,
      careMin: 2000,
      includes: [
        "Up to 300 products or pages of content",
        "Mobile-first responsive build",
        "WhatsApp and inquiry forms",
        "On-page SEO basics",
        "Simple admin to edit content and orders",
        "Domain for the first year",
      ],
      mostChosen: false,
    },
    {
      id: "scale",
      name: "Scale",
      audience: "For businesses ready to sell more.",
      setupMin: 60000,
      setupMax: 150000,
      careMin: 4000,
      careMax: 7000,
      includes: [
        "Up to 1,500 products",
        "Custom design made for your brand",
        "eSewa, Khalti and card payments",
        "Order tracking and status emails",
        "Analytics and conversion tracking",
        "SSL and domain",
      ],
      mostChosen: true,
    },
    {
      id: "custom",
      name: "Custom",
      audience: "For platforms and funded startups.",
      setupMin: 150000,
      setupMax: 300000,
      careMin: 12000,
      careFrom: true,
      includes: [
        "Unlimited catalogue",
        "Full design system",
        "Customer accounts and coupons",
        "Logistics and accounting integrations",
        "Advanced SEO and security review",
        "Daily backups and priority onboarding",
      ],
      mostChosen: false,
    },
  ],
  appDev: {
    title: "Application development",
    from: 100000,
    note: "Web and mobile apps from Rs. 1,00,000, scoped after a free discovery call.",
  },
  included: [
    "A written scope and a fixed quote before work starts",
    "Weekly progress on a private preview link",
    "A mobile-first build tested on real phones",
    "Your domain, code and content stay yours",
    "Training for your team at launch",
    ph("30 days of fixes after launch", "Post-launch fix period"),
  ],
  faqs: [
    {
      question: "What is the care plan?",
      answer:
        "A monthly plan that keeps your site safe and current: hosting, security updates, backups, uptime checks and small content changes. Launch care is Rs. 2,000 per month, Scale care is Rs. 4,000 to 7,000, and Custom care starts at Rs. 12,000.",
    },
    {
      question: "Who owns the code?",
      answer:
        "You do. The domain is registered in your name, and the code and content belong to you from launch. If you stop the care plan, we hand over everything you need to run the site elsewhere.",
    },
    {
      question: "How long does a build take?",
      answer: ph(
        "A Launch site takes 2 to 3 weeks and a Scale shop 4 to 6 weeks. Custom builds usually take 8 weeks or more, and the exact timeline is set in your written scope.",
        "Build durations per plan",
      ),
    },
    {
      question: "How do payments work?",
      answer: ph(
        "Half when you accept the written quote and half at launch. Larger projects are split into milestones. Care plans are billed monthly.",
        "Payment schedule",
      ),
    },
  ],
};
