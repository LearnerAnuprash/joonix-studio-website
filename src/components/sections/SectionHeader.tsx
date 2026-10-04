import { ArrowLink } from "@/components/common/ArrowLink";
import { Grid } from "@/components/layout/Container";
import type { NavItem } from "@/data/types";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  intro?: string;
  link?: NavItem;
  id?: string;
  layout?: "split" | "stacked";
  className?: string;
};

export function SectionHeader({
  title,
  intro,
  link,
  id,
  layout = "split",
  className,
}: SectionHeaderProps) {
  const split = layout === "split";

  return (
    <Grid className={cn("gap-y-6 reveal", className)}>
      <h2
        id={id}
        className={cn(
          "col-span-full text-h2",
          split ? "lg:col-span-5" : "md:col-span-6 lg:col-span-7",
        )}
      >
        {title}
      </h2>
      {(intro || link) && (
        <div
          className={cn(
            "col-span-full flex flex-col items-start gap-6",
            split
              ? "md:col-span-6 lg:col-span-6 lg:col-start-7 lg:pt-2"
              : "md:col-span-6",
          )}
        >
          {intro && <p className="text-lead text-muted-foreground">{intro}</p>}
          {link && <ArrowLink href={link.href}>{link.label}</ArrowLink>}
        </div>
      )}
    </Grid>
  );
}
