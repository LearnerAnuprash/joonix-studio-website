import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Section, type Tone } from "@/components/layout/Section";

type LabSectionProps = {
  id: string;
  title: string;
  tone?: Tone;
  children: ReactNode;
};

export function LabSection({
  id,
  title,
  tone = "base",
  children,
}: LabSectionProps) {
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <Container className="flex flex-col gap-10">
        <h2 id={`${id}-title`} className="text-h2">
          {title}
        </h2>
        {children}
      </Container>
    </Section>
  );
}
