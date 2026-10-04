import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchBoxProps = {
  action?: string;
  defaultValue?: string;
  className?: string;
};

export function SearchBox({
  action = "/blog",
  defaultValue,
  className,
}: SearchBoxProps) {
  return (
    <form
      role="search"
      action={action}
      method="get"
      className={cn("relative w-full max-w-xl", className)}
    >
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
      />
      <input
        id="blog-search"
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search articles"
        autoComplete="off"
        className="h-12 w-full rounded-md border border-input bg-secondary pr-4 pl-12 text-base text-foreground transition-[border-color] duration-150 ease-out placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      />
    </form>
  );
}
