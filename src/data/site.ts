export type NavItem = {
  label: string;
  href: string;
};

export const site = {
  name: "Joonix Studio",
  positioning: "Software development agency from Silicon Peaks, Nepal.",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ] satisfies NavItem[],
  cta: { label: "Start a project", href: "/contact" } satisfies NavItem,
};
