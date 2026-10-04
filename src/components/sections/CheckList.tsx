import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckListProps = {
  items: string[];
  columns?: 1 | 2;
  className?: string;
};

export function CheckList({ items, columns = 2, className }: CheckListProps) {
  return (
    <ul
      className={cn(
        "grid gap-x-(--col-gap) border-t border-border",
        columns === 2 && "md:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 border-b border-border py-4"
        >
          <CheckIcon aria-hidden="true" className="mt-1 size-5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
