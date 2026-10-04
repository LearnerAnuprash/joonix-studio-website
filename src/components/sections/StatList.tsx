import type { Stat } from "@/data/types";
import { cn } from "@/lib/utils";

type StatListProps = {
  stats: Stat[];
  className?: string;
};

export function StatList({ stats, className }: StatListProps) {
  return (
    <ul
      className={cn(
        "grid gap-x-(--col-gap) gap-y-12 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat) => (
        <li
          key={stat.label}
          className="flex flex-col gap-3 border-t border-input pt-6 reveal"
        >
          <span className="text-h1 tabular">{stat.value}</span>
          <span className="max-w-60 text-muted-foreground">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
