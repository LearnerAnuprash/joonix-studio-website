import type { ClientLogo } from "@/data/types";
import { cn } from "@/lib/utils";

type LogoStripProps = {
  title: string;
  logos: ClientLogo[];
  className?: string;
};

export function LogoStrip({ title, logos, className }: LogoStripProps) {
  if (logos.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <h2 className="text-caption font-medium text-muted-foreground">
        {title}
      </h2>
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo) => (
          <li
            key={logo.name}
            className="flex h-24 items-center justify-center bg-background p-6"
          >
            {logo.image ? (
              <img
                src={logo.image.src}
                width={logo.image.width}
                height={logo.image.height}
                alt={logo.name}
                loading="lazy"
                decoding="async"
                className="max-h-10 w-auto"
              />
            ) : (
              <span className="text-sm font-medium">{logo.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
