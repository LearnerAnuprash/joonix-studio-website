import { ArrowRightIcon } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { RidgeLine } from "@/components/brand/RidgeLine";
import { Container, Grid } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/data/types";

export type FooterContact = {
  addressLines: string[];
  email: NavItem;
  phone: NavItem;
  whatsapp: NavItem;
  hours: string;
};

export type FooterColumn = {
  title: string;
  links: NavItem[];
};

type FooterProps = {
  siteName: string;
  positioning: string;
  cta: NavItem;
  contact: FooterContact;
  columns: FooterColumn[];
  legal: NavItem[];
  socials: NavItem[];
  year: number;
};

function FooterLink({ item }: { item: NavItem }) {
  return (
    <a
      href={item.href}
      className="inline-flex min-h-8 items-center rounded-sm text-muted-foreground underline-offset-3 transition-colors duration-150 hover:text-foreground hover:underline"
    >
      {item.label}
    </a>
  );
}

export function Footer({
  siteName,
  positioning,
  cta,
  contact,
  columns,
  legal,
  socials,
  year,
}: FooterProps) {
  return (
    <footer data-tone="black" data-review-id="G-02" className="relative">
      <RidgeLine />
      <Container className="pt-16 pb-10 md:pt-20 lg:pt-24">
        <Grid className="gap-y-16">
          <div className="col-span-full flex flex-col items-start gap-6 lg:col-span-5">
            <a href="/" aria-label={`${siteName}, home`} className="rounded-md">
              <Logo />
            </a>
            <p className="max-w-sm text-h4">{positioning}</p>
            <Button asChild variant="outline">
              <a href={cta.href}>
                {cta.label}
                <ArrowRightIcon />
              </a>
            </Button>
          </div>
          <nav
            aria-label="Footer"
            className="col-span-full grid grid-cols-2 gap-x-(--col-gap) gap-y-10 md:col-span-4 lg:col-span-3 lg:col-start-7"
          >
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h2 className="text-caption font-medium">{column.title}</h2>
                <ul className="flex flex-col gap-1 text-sm">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <FooterLink item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="col-span-full flex flex-col gap-3 md:col-span-4 lg:col-span-3 lg:col-start-10">
            <h2 className="text-caption font-medium">Contact</h2>
            <address className="flex flex-col gap-1 text-sm text-muted-foreground not-italic">
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <span className="mt-3 flex flex-col gap-1">
                <FooterLink item={contact.email} />
                <FooterLink item={contact.phone} />
                <FooterLink item={contact.whatsapp} />
              </span>
              <span className="mt-3">{contact.hours}</span>
            </address>
          </div>
        </Grid>
        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-caption text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteName}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {[...socials, ...legal].map((item) => (
              <li key={item.href}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
