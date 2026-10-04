import type { FooterColumn, FooterContact } from "@/components/layout/Footer";
import type { Site } from "@/data/site";
import type { NavItem } from "@/data/types";
import { emailHref, formatPhone, phoneHref, whatsappHref } from "@/lib/contact";

export function whatsappLink(site: Site, text?: string): NavItem {
  return {
    label: "Message us on WhatsApp",
    href: whatsappHref(
      site.phone,
      text ?? `Hello ${site.name}, I would like to talk about a project.`,
    ),
  };
}

export function contactLinks(site: Site): NavItem[] {
  return [
    { label: "WhatsApp", href: whatsappHref(site.phone) },
    { label: site.email, href: emailHref(site.email) },
    { label: formatPhone(site.phone), href: phoneHref(site.phone) },
  ];
}

export function footerContact(site: Site): FooterContact {
  return {
    addressLines: [site.address.street, site.address.country],
    email: { label: site.email, href: emailHref(site.email) },
    phone: { label: formatPhone(site.phone), href: phoneHref(site.phone) },
    whatsapp: { label: "WhatsApp", href: whatsappHref(site.phone) },
    hours: site.hours.label,
  };
}

export function footerColumns(site: Site): FooterColumn[] {
  return [
    {
      title: "Studio",
      links: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Pricing", href: "/pricing" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Website design", href: "/services/website-design" },
        { label: "Applications", href: "/services/application-development" },
        { label: "All services", href: "/services" },
        { label: site.cta.label, href: site.cta.href },
      ],
    },
  ];
}
