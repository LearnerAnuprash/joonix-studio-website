import { useEffect, useState } from "react";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavItem } from "@/data/site";
import { isCurrentPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  nav: NavItem[];
  cta: NavItem;
  currentPath: string;
  siteName: string;
  positioning: string;
  className?: string;
};

const DESKTOP_QUERY = "(min-width: 64rem)";

export function MobileNav({
  nav,
  cta,
  currentPath,
  siteName,
  positioning,
  className,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const close = () => query.matches && setOpen(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <MenuIcon />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        data-tone="deep"
        showCloseButton={false}
        aria-describedby={undefined}
        className="gap-0 border-none data-[side=top]:h-dvh"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="page-width flex h-(--header-h) shrink-0 items-center justify-between">
          <a href="/" aria-label={`${siteName}, home`} className="rounded-md">
            <Logo />
          </a>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <XIcon />
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetClose>
        </div>
        <nav
          aria-label="Main"
          className="page-width flex flex-1 flex-col justify-between gap-12 overflow-y-auto pt-8 pb-10"
        >
          <ul className="border-t border-border">
            {nav.map((item) => {
              const current = isCurrentPath(currentPath, item.href);
              return (
                <li key={item.href} className="border-b border-border">
                  <a
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-between py-5 text-h3 transition-colors duration-150",
                      current
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <ArrowRightIcon className="size-6 transition-transform duration-150 group-hover:translate-x-1" />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-6">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto sm:self-start"
            >
              <a href={cta.href}>{cta.label}</a>
            </Button>
            <p className="text-sm text-muted-foreground">{positioning}</p>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
