import type { Author } from "@/data/types";
import { formatDate, formatReadingTime, isoDay } from "@/lib/format";
import { cn } from "@/lib/utils";

type PostMetaProps = {
  author: Author;
  publishDate: Date;
  updatedDate?: Date;
  readingTime: number;
  className?: string;
};

export function PostMeta({
  author,
  publishDate,
  updatedDate,
  readingTime,
  className,
}: PostMetaProps) {
  const items = [
    {
      label: "Written by",
      value: (
        <a
          href={`/blog/authors/${author.slug}`}
          className="rounded-sm underline-offset-3 hover:underline"
        >
          {author.name}
        </a>
      ),
    },
    {
      label: "Published",
      value: (
        <time dateTime={isoDay(publishDate)}>{formatDate(publishDate)}</time>
      ),
    },
    ...(updatedDate
      ? [
          {
            label: "Updated",
            value: (
              <time dateTime={isoDay(updatedDate)}>
                {formatDate(updatedDate)}
              </time>
            ),
          },
        ]
      : []),
    { label: "Reading time", value: formatReadingTime(readingTime) },
  ];

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-(--col-gap) gap-y-6 border-t border-border pt-6 text-sm md:flex md:flex-wrap md:gap-x-12",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <dt className="text-caption text-muted-foreground">{item.label}</dt>
          <dd className="font-medium">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
