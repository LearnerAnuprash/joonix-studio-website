import type { Point } from "@/data/types";
import { cn } from "@/lib/utils";

type PointGridProps = {
  items: Point[];
  columns?: 2 | 3;
  headingLevel?: "h3" | "h4";
  className?: string;
};

export function PointGrid({
  items,
  columns = 3,
  headingLevel: Heading = "h3",
  className,
}: PointGridProps) {
  return (
    <ul
      className={cn(
        "grid gap-x-(--col-gap) gap-y-12 md:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col gap-3 border-t border-input pt-6 reveal"
        >
          <Heading className="text-h4">{item.title}</Heading>
          <p className="text-muted-foreground">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
