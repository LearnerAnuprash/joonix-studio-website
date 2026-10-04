import { ArrowRightIcon, CheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/data/types";
import { formatMoney, formatMoneyParts, formatMoneyRange } from "@/lib/format";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  plan: Plan;
  className?: string;
};

export function careLabel(plan: Plan): string {
  if (plan.careFrom)
    return `Care plan from ${formatMoney(plan.careMin)} per month`;
  return `Care plan ${formatMoneyRange(plan.careMin, plan.careMax)} per month`;
}

export function PricingCard({ plan, className }: PricingCardProps) {
  const headingId = `plan-${plan.id}`;

  return (
    <article
      aria-labelledby={headingId}
      data-tone={plan.mostChosen ? "inverse" : undefined}
      className={cn(
        "flex h-full flex-col gap-8 rounded-lg border border-border p-6 md:p-8",
        plan.mostChosen && "border-transparent",
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex min-h-8 flex-wrap items-center justify-between gap-3">
          <h3 id={headingId} className="text-h3">
            {plan.name}
          </h3>
          {plan.mostChosen && <Badge>Most chosen</Badge>}
        </div>
        <p className="text-muted-foreground">{plan.audience}</p>
      </div>
      <div className="flex flex-col gap-2 border-t border-border pt-6">
        <p className="text-caption font-medium text-muted-foreground">Setup</p>
        <p className="text-h3 tabular">
          {formatMoneyParts(plan.setupMin, plan.setupMax).map((part, index) => (
            <span key={part} className="whitespace-nowrap">
              {index > 0 && " "}
              {part}
            </span>
          ))}
        </p>
        <p className="text-sm text-muted-foreground tabular">
          {careLabel(plan)}
        </p>
      </div>
      <ul className="flex flex-1 flex-col gap-3 border-t border-border pt-6">
        {plan.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckIcon aria-hidden="true" className="mt-1 size-5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Button
        asChild
        variant={plan.mostChosen ? "default" : "outline"}
        className="w-full"
      >
        <a href={`/contact?plan=${plan.id}`}>
          Start with {plan.name}
          <ArrowRightIcon />
        </a>
      </Button>
    </article>
  );
}
