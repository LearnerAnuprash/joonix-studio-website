import { Badge } from "@/components/ui/badge";
import type { Tag } from "@/data/types";
import { cn } from "@/lib/utils";

type TagFilterProps = {
  tags: Tag[];
  current?: string;
  className?: string;
};

export function TagFilter({ tags, current, className }: TagFilterProps) {
  const items = [
    { slug: undefined, label: "All articles", href: "/blog" },
    ...tags.map((tag) => ({
      slug: tag.slug,
      label: tag.label,
      href: `/blog/tag/${tag.slug}`,
    })),
  ];

  return (
    <nav aria-label="Topics" className={className}>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = item.slug === current;
          return (
            <li key={item.href}>
              <Badge
                asChild
                size="lg"
                variant={active ? "solid" : "outline"}
                className={cn(
                  !active && "text-muted-foreground hover:text-foreground",
                )}
              >
                <a href={item.href} aria-current={active ? "page" : undefined}>
                  {item.label}
                </a>
              </Badge>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
