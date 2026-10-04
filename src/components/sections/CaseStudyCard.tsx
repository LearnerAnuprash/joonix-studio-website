import { ArrowRightIcon } from "lucide-react";

import { Media } from "@/components/media/Media";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/data/types";
import { cn } from "@/lib/utils";

export type CaseStudyCardProps = {
  work: Pick<
    CaseStudy,
    "slug" | "title" | "client" | "year" | "result" | "cover" | "draft"
  >;
  serviceLabels: string[];
  layout?: "media-start" | "media-end";
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function CaseStudyCard({
  work,
  serviceLabels,
  layout = "media-start",
  headingLevel: Heading = "h3",
  className,
}: CaseStudyCardProps) {
  const mediaEnd = layout === "media-end";

  return (
    <article
      className={cn(
        "group relative page-grid items-center gap-y-8 reveal",
        className,
      )}
    >
      <Media
        ratio={work.cover.ratio}
        image={work.cover.image}
        className={cn(
          "col-span-full transition-[border-color] duration-150 group-hover:border-input lg:col-span-7",
          mediaEnd && "lg:order-last lg:col-start-6",
        )}
      />
      <div
        className={cn(
          "col-span-full flex flex-col items-start gap-4 lg:col-span-4",
          mediaEnd ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9",
        )}
      >
        <p className="text-caption text-muted-foreground">
          {work.client}, {work.year}
        </p>
        <Heading className="text-h3">
          <a
            href={`/work/${work.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-['']"
          >
            {work.title}
          </a>
        </Heading>
        <p className="text-muted-foreground">{work.result}</p>
        <div className="flex flex-wrap gap-2">
          {work.draft && <Badge variant="solid">Draft</Badge>}
          {serviceLabels.map((label) => (
            <Badge key={label} variant="quiet">
              {label}
            </Badge>
          ))}
        </div>
        <span
          aria-hidden="true"
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium"
        >
          Read the case study
          <ArrowRightIcon className="size-5 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
