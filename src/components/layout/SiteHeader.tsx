import type { ReactNode } from "react";

import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import type { Tone } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/data/site";
import { isCurrentPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  tone?: Tone;
  nav: NavItem[];
  cta: NavItem;
  currentPath: string;
  siteName: string;
  themeToggle?: ReactNode;
  mobileNav?: ReactNode;
};

export function SiteHeader({
  tone = "base",
  nav,
  cta,
  currentPath,
  siteName,
  themeToggle,
  mobileNav,
}: SiteHeaderProps) {
  return (
    <header
      data-tone={tone}
      data-review-id="G-01"
      className="sticky top-0 z-40 h-(--header-h) border-b header-scroll"
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <a href="/" aria-label={`${siteName}, home`} className="rounded-md">
          <Logo />
        </a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => {
              const current = isCurrentPath(currentPath, item.href);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "rounded-md text-sm font-medium underline-offset-8 transition-colors duration-150",
                      current
                        ? "text-foreground underline"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {themeToggle}
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={cta.href}>{cta.label}</a>
          </Button>
          {mobileNav}
        </div>
      </Container>
    </header>
  );
}
