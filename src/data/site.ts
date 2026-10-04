import { ph } from "@/lib/placeholder";

import type { NavItem } from "./types";

export type OpeningHours = {
  days: string[];
  opens: string;
  closes: string;
};

export const site = {
  name: "Joonix Studio",
  legalName: ph("Joonix Studio Pvt. Ltd.", "Registered legal name"),
  positioning: "Software development agency from Silicon Peaks, Nepal.",
  description:
    "Joonix Studio designs, builds and looks after websites and apps for businesses in Nepal and abroad. Clear prices, a written scope, and a care plan after launch.",
  foundingYear: ph("2024", "Founding year"),
  email: ph("hello@joonixstudio.com", "Contact email address"),
  phone: ph("+9779800000000", "Phone and WhatsApp number"),
  address: {
    street: ph("Kathmandu 44600", "Street address and postal code"),
    locality: "Kathmandu",
    region: "Bagmati",
    postalCode: ph("44600", "Postal code"),
    country: "Nepal",
    countryCode: "NP",
  },
  geo: {
    latitude: 27.7172,
    longitude: 85.324,
  },
  hours: {
    label: ph("Monday to Friday, 9:00 to 18:00 NPT", "Opening hours"),
    spec: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ] satisfies OpeningHours[],
  },
  promises: {
    reply: ph("We reply within one working day.", "Reply time promise"),
    call: ph("Free 30 minute discovery call.", "Discovery call length"),
  },
  socials: [] as NavItem[],
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ] satisfies NavItem[],
  cta: { label: "Start a project", href: "/contact" } satisfies NavItem,
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ] satisfies NavItem[],
};

export type Site = typeof site;
