import type { Quote } from "@/data/types";
import { cn } from "@/lib/utils";

type QuoteBlockProps = {
  quote: Quote;
  className?: string;
};

export function QuoteBlock({ quote, className }: QuoteBlockProps) {
  return (
    <figure className={cn("flex max-w-4xl flex-col gap-8 reveal", className)}>
      <blockquote className="text-h3">
        <p>{quote.text}</p>
      </blockquote>
      <figcaption className="flex flex-col text-sm">
        <span className="font-medium">{quote.name}</span>
        <span className="text-muted-foreground">
          {quote.role}, {quote.company}
        </span>
      </figcaption>
    </figure>
  );
}
