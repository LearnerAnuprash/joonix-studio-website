import { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import type { Heading } from "@/data/types";
import { cn } from "@/lib/utils";

type TocProps = {
  headings: Heading[];
  className?: string;
};

function useActiveHeading(slugs: string[]) {
  const [active, setActive] = useState<string | undefined>();

  useEffect(() => {
    const elements = slugs
      .map((slug) => document.getElementById(slug))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const offset =
        parseFloat(
          getComputedStyle(document.documentElement).scrollPaddingTop,
        ) || 0;
      let current: string | undefined;
      for (const element of elements) {
        if (element.getBoundingClientRect().top - offset <= 8) {
          current = element.id;
        } else {
          break;
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [slugs]);

  return active;
}

function TocList({
  headings,
  active,
}: {
  headings: Heading[];
  active?: string;
}) {
  return (
    <ol className="flex flex-col border-l border-border text-sm">
      {headings.map((heading) => {
        const current = heading.slug === active;
        return (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              aria-current={current ? "location" : undefined}
              className={cn(
                "-ml-px flex min-h-11 items-center border-l-2 py-2 pr-2 transition-colors duration-150",
                heading.depth > 2 ? "pl-8" : "pl-4",
                current
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export function Toc({ headings, className }: TocProps) {
  const items = headings.filter((heading) => heading.depth <= 3);
  const [slugs] = useState(() => items.map((heading) => heading.slug));
  const active = useActiveHeading(slugs);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className={className}>
      <details className="group rounded-lg border border-border lg:hidden">
        <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-lg px-5 text-sm font-medium">
          On this page
          <ChevronDownIcon
            aria-hidden="true"
            className="size-5 transition-transform duration-150 group-open:rotate-180"
          />
        </summary>
        <div className="px-5 pb-5">
          <TocList headings={items} active={active} />
        </div>
      </details>
      <div className="hidden flex-col gap-4 lg:flex">
        <p className="text-caption font-medium text-muted-foreground">
          On this page
        </p>
        <TocList headings={items} active={active} />
      </div>
    </nav>
  );
}
