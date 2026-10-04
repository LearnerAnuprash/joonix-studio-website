import { TextLink } from "@/components/common/TextLink";
import type { Author } from "@/data/types";
import { cn } from "@/lib/utils";

type AuthorBoxProps = {
  author: Author;
  className?: string;
};

export function AuthorBox({ author, className }: AuthorBoxProps) {
  return (
    <section
      aria-labelledby="about-author"
      className={cn(
        "flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:gap-(--col-gap)",
        className,
      )}
    >
      <h2
        id="about-author"
        className="text-caption font-medium text-muted-foreground md:w-40 md:shrink-0 md:pt-1"
      >
        Written by
      </h2>
      <div className="flex flex-col gap-3">
        <p className="text-h4">
          <a
            href={`/blog/authors/${author.slug}`}
            className="rounded-sm underline-offset-4 hover:underline"
          >
            {author.name}
          </a>
        </p>
        <p className="text-caption text-muted-foreground">{author.role}</p>
        <p className="max-w-xl text-muted-foreground">{author.bio}</p>
        {author.links.length > 0 && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {author.links.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href} newTab>
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
