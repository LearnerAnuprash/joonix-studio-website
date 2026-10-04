import { ArrowRightIcon } from "lucide-react";

import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export type PriceRow = {
  name: string;
  audience: string;
  from: number;
  href: string;
};

type PriceListProps = {
  rows: PriceRow[];
  className?: string;
};

export function PriceList({ rows, className }: PriceListProps) {
  return (
    <ul className={cn("border-t border-border", className)}>
      {rows.map((row) => (
        <li key={row.name} className="group relative border-b border-border">
          <a
            href={row.href}
            className="page-grid items-baseline gap-y-2 rounded-md py-6 md:py-8"
          >
            <span className="col-span-full text-h3 md:col-span-3 lg:col-span-4">
              {row.name}
            </span>
            <span className="col-span-full text-muted-foreground md:col-span-3 lg:col-span-4">
              {row.audience}
            </span>
            <span className="col-span-full flex items-center justify-between gap-4 md:col-span-2 lg:col-span-4">
              <span className="text-h4 tabular">
                <span className="text-sm text-muted-foreground">from </span>
                {formatMoney(row.from)}
              </span>
              <ArrowRightIcon
                aria-hidden="true"
                className="size-6 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-1"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
