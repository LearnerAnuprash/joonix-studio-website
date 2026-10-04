import { cn } from "@/lib/utils";

export type AmbientVariant = "horizon" | "corner" | "soft";

type AmbientProps = {
  variant?: AmbientVariant;
  grain?: boolean;
  drift?: boolean;
  className?: string;
};

const lightClass: Record<AmbientVariant, string> = {
  horizon: "ambient-horizon",
  corner: "ambient-corner",
  soft: "ambient-soft",
};

export function Ambient({
  variant = "soft",
  grain = true,
  drift = false,
  className,
}: AmbientProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute -inset-[8%]",
          lightClass[variant],
          drift && "ambient-drift",
        )}
      />
      {grain && <div className="absolute inset-0 ambient-grain" />}
    </div>
  );
}
