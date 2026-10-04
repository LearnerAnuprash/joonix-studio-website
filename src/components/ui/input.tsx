import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-md border border-input bg-secondary px-4 text-base text-foreground transition-[border-color] duration-150 ease-out placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-2 aria-invalid:border-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
