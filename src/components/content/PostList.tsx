import { Badge } from "@/components/ui/badge";
import type { PostSummary } from "@/data/types";
import { formatDate, formatReadingTime, isoDay } from "@/lib/format";
import { cn } from "@/lib/utils";

type PostListProps = {
  posts: PostSummary[];
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function PostList({
  posts,
  headingLevel: Heading = "h3",
  className,
}: PostListProps) {
  return (
    <ul className={cn("border-t border-border", className)}>
      {posts.map((post) => (
        <li
          key={post.slug}
          className="group relative page-grid gap-y-3 border-b border-border py-8 transition-colors duration-150 md:py-10"
        >
          <p className="col-span-full text-caption text-muted-foreground md:col-span-2 md:pt-1 lg:col-span-2">
            <time dateTime={isoDay(post.publishDate)}>
              {formatDate(post.publishDate)}
            </time>
          </p>
          <div className="col-span-full flex flex-col gap-3 md:col-span-6 lg:col-span-7">
            <Heading className="text-h4">
              <a
                href={`/blog/${post.slug}`}
                className="rounded-sm decoration-1 underline-offset-4 group-hover:underline after:absolute after:inset-0 after:content-['']"
              >
                {post.title}
              </a>
            </Heading>
            <p className="text-muted-foreground">{post.description}</p>
          </div>
          <div className="col-span-full flex flex-wrap items-center gap-3 md:col-span-6 md:col-start-3 lg:col-span-3 lg:flex-col lg:items-end lg:pt-1">
            {post.draft && <Badge variant="solid">Draft</Badge>}
            {post.tags[0] && (
              <Badge variant="quiet">{post.tags[0].label}</Badge>
            )}
            <span className="text-caption text-muted-foreground">
              {formatReadingTime(post.readingTime)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
