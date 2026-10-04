import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("page-width", className)} {...props} />;
}

export function Grid({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("page-grid", className)} {...props} />;
}
