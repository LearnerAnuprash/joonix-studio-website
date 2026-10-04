import { cn } from "@/lib/utils";

type RidgeLineProps = {
  className?: string;
};

export function RidgeLine({ className }: RidgeLineProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-24 w-full bg-muted md:h-32 lg:h-40", className)}
    />
  );
}
