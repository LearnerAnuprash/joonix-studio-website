import { ArrowRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { PostSummary } from "@/data/types";
import { formatDate, formatReadingTime, isoDay } from "@/lib/format";
import { cn } from "@/lib/utils";

type FeaturedPostProps = {
  post: PostSummary;
  className?: string;
};

export function FeaturedPost({ post, className }: FeaturedPostProps) {
  return (
    <article
      className={cn(
        "group relative grid gap-8 rounded-lg border border-border p-6 transition-colors duration-150 reveal hover:border-input hover:bg-secondary md:p-10 lg:grid-cols-12 lg:gap-(--col-gap)",
        className,
      )}
    >
      <div className="flex flex-col gap-4 lg:col-span-3">
        <p className="text-caption text-muted-foreground">
          Latest article,{" "}
          <time dateTime={isoDay(post.publishDate)}>
            {formatDate(post.publishDate)}
          </time>
        </p>
        <div className="flex flex-wrap gap-2">
          {post.draft && <Badge variant="solid">Draft</Badge>}
          {post.tags.map((tag) => (
            <Badge key={tag.slug} variant="quiet">
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 lg:col-span-8 lg:col-start-5">
        <h2 className="text-h2">
          <a
            href={`/blog/${post.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </a>
        </h2>
        <p className="max-w-2xl text-lead text-muted-foreground">
          {post.description}
        </p>
        <span
          aria-hidden="true"
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium"
        >
          Read the article, {formatReadingTime(post.readingTime)}
          <ArrowRightIcon className="size-5 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
