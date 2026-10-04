import { cn } from "@/lib/utils";

type RuleProps = {
  label?: string;
  className?: string;
};

export function Rule({ label, className }: RuleProps) {
  if (!label) {
    return <hr className={cn("border-t border-border", className)} />;
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-caption font-medium text-muted-foreground">
        {label}
      </span>
      <hr aria-hidden="true" className="flex-1 border-t border-border" />
    </div>
  );
}
