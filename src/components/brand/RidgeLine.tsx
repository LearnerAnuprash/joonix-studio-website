import { cn } from "@/lib/utils";

type RidgeLineProps = {
  className?: string;
};

export function RidgeLine({ className }: RidgeLineProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-20 w-full border-t border-border bg-muted/30 md:h-24 lg:h-32",
        className,
      )}
    />
  );
}
