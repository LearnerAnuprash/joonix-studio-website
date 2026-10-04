import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("block h-10 w-28 rounded-md bg-muted", className)}
    />
  );
}
