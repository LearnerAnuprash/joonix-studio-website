import type { ComponentProps } from "react";
import { ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type TextLinkProps = ComponentProps<"a"> & {
  href: string;
  newTab?: boolean;
  tone?: "default" | "soft";
};

export function TextLink({
  href,
  newTab = false,
  tone = "default",
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm link",
        tone === "soft"
          ? "text-muted-foreground hover:text-foreground"
          : "text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      {newTab && (
        <>
          <ArrowUpRightIcon aria-hidden="true" className="size-4 shrink-0" />
          <span className="sr-only">(opens in new tab)</span>
        </>
      )}
    </a>
  );
}
