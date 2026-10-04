import { cn } from "@/lib/utils";

type AnswerBoxProps = {
  answer: string;
  className?: string;
};

export function AnswerBox({ answer, className }: AnswerBoxProps) {
  return (
    <section
      aria-labelledby="short-answer"
      className={cn("border-y border-input py-8", className)}
    >
      <h2
        id="short-answer"
        className="mb-4 text-caption font-medium text-muted-foreground"
      >
        Short answer
      </h2>
      <p className="text-lead">{answer}</p>
    </section>
  );
}
