import { MinusIcon, PlusIcon } from "lucide-react";

import type { Faq } from "@/data/types";
import { cn } from "@/lib/utils";

type FaqListProps = {
  faqs: Faq[];
  headingLevel?: "h3" | "h4";
  className?: string;
};

export function FaqList({
  faqs,
  headingLevel: Heading = "h3",
  className,
}: FaqListProps) {
  return (
    <div className={cn("border-t border-border", className)}>
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-border">
          <summary className="flex min-h-11 cursor-pointer items-start justify-between gap-6 rounded-md py-6 transition-colors duration-150 hover:text-foreground">
            <Heading className="text-h4">{faq.question}</Heading>
            <PlusIcon
              aria-hidden="true"
              className="mt-0.5 size-6 shrink-0 group-open:hidden"
            />
            <MinusIcon
              aria-hidden="true"
              className="mt-0.5 hidden size-6 shrink-0 group-open:block"
            />
          </summary>
          <p className="max-w-(--container-measure) pr-12 pb-8 text-muted-foreground">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
