import type { ComponentProps } from "react";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ArrowLinkProps = ComponentProps<"a"> & {
  href: string;
};

export function ArrowLink({ className, children, ...props }: ArrowLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    >
      <span className="underline decoration-transparent decoration-1 underline-offset-3 transition-[text-decoration-color] duration-150 group-hover:decoration-current">
        {children}
      </span>
      <ArrowRightIcon
        aria-hidden="true"
        className="size-5 transition-transform duration-150 ease-out group-hover:translate-x-1"
      />
    </a>
  );
}
