import type { ReactNode } from "react";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type LinkCardProps = {
  href: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function LinkCard({
  href,
  title,
  description,
  meta,
  headingLevel: Heading = "h3",
  className,
}: LinkCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex h-full flex-col gap-6 rounded-lg border border-border p-6 transition-colors duration-150 ease-out hover:border-input hover:bg-secondary md:p-8",
        className,
      )}
    >
      {meta && (
        <span className="text-caption text-muted-foreground">{meta}</span>
      )}
      <span className="flex flex-1 flex-col gap-3">
        <Heading className="text-h4">{title}</Heading>
        {description && (
          <span className="text-muted-foreground">{description}</span>
        )}
      </span>
      <ArrowRightIcon
        aria-hidden="true"
        className="size-6 transition-transform duration-150 ease-out group-hover:translate-x-1"
      />
    </a>
  );
}
