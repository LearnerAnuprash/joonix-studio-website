import type { ReactNode } from "react";

import { Grid } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

type SplitBlockProps = {
  title: string;
  id?: string;
  children: ReactNode;
  className?: string;
};

export function SplitBlock({
  title,
  id,
  children,
  className,
}: SplitBlockProps) {
  return (
    <Grid
      className={cn("gap-y-6 border-t border-border pt-10 reveal", className)}
    >
      <h2 id={id} className="col-span-full text-h3 lg:col-span-4">
        {title}
      </h2>
      <div className="col-span-full flex max-w-(--container-measure) flex-col gap-5 text-lead text-muted-foreground lg:col-span-7 lg:col-start-6">
        {children}
      </div>
    </Grid>
  );
}
