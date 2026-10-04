import type { ProcessStep } from "@/data/types";
import { cn } from "@/lib/utils";

type ProcessStepsProps = {
  steps: ProcessStep[];
  className?: string;
};

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <ol
      className={cn(
        "grid gap-x-(--col-gap) gap-y-12 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="flex flex-col gap-4 border-t border-input pt-6 reveal"
        >
          <span aria-hidden="true" className="text-h2 tabular">
            {index + 1}
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="text-h4">
              <span className="sr-only">Step {index + 1}: </span>
              {step.title}
            </h3>
            <p className="text-caption font-medium text-muted-foreground">
              {step.duration}
            </p>
          </div>
          <p className="text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
