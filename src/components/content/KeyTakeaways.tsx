import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type KeyTakeawaysProps = {
  items: string[];
  className?: string;
};

export function KeyTakeaways({ items, className }: KeyTakeawaysProps) {
  return (
    <section
      aria-labelledby="key-takeaways"
      className={cn("rounded-lg border border-border p-6 md:p-8", className)}
    >
      <h2 id="key-takeaways" className="mb-6 text-h4">
        Key takeaways
      </h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckIcon aria-hidden="true" className="mt-1 size-5 shrink-0" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
