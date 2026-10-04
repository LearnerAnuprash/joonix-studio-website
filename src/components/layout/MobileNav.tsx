import { useEffect, useRef } from "react";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/data/types";
import { isCurrentPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  nav: NavItem[];
  cta: NavItem;
  currentPath: string;
  siteName: string;
  positioning: string;
  contactLinks?: NavItem[];
  className?: string;
};

const DESKTOP_QUERY = "(min-width: 64rem)";

export function MobileNav({
  nav,
  cta,
  currentPath,
  siteName,
  positioning,
  contactLinks = [],
  className,
}: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const close = () => {
      if (query.matches) dialogRef.current?.close();
    };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();
  const restoreFocus = () => triggerRef.current?.focus();

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        aria-haspopup="dialog"
        onClick={open}
        className={className}
      >
        <MenuIcon />
        <span className="sr-only">Menu</span>
      </Button>
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        data-tone="deep"
        onClose={restoreFocus}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-hidden p-0 opacity-0 transition-[opacity,display,overlay] transition-discrete duration-200 ease-out backdrop:bg-black/60 open:flex open:opacity-100 starting:open:opacity-0"
      >
        <div className="page-width flex h-(--header-h) shrink-0 items-center justify-between">
          <a href="/" aria-label={`${siteName}, home`} className="rounded-md">
            <Logo />
          </a>
          <Button variant="ghost" size="icon" autoFocus onClick={close}>
            <XIcon />
            <span className="sr-only">Close menu</span>
          </Button>
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
            {contactLinks.length > 0 && (
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {contactLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex min-h-11 items-center rounded-sm underline-offset-3 hover:underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm text-muted-foreground">{positioning}</p>
          </div>
        </nav>
      </dialog>
    </>
  );
}
