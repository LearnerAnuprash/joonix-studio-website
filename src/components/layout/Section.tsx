import type { HTMLAttributes } from "react";

import { Ambient, type AmbientVariant } from "@/components/brand/Ambient";
import { cn } from "@/lib/utils";

export type Tone = "base" | "deep" | "inverse" | "black";

export type SectionSpacing = "section" | "hero" | "none";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "header" | "footer" | "aside";
  tone?: Tone;
  spacing?: SectionSpacing;
  ambient?: AmbientVariant;
  drift?: boolean;
  reviewId?: string;
};

const spacingClass: Record<SectionSpacing, string> = {
  section: "py-(--section-pad)",
  hero: "pt-(--hero-pad-top) pb-(--section-pad)",
  none: "",
};

export function Section({
  as: Tag = "section",
  tone = "base",
  spacing = "section",
  ambient,
  drift = false,
  reviewId,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      data-tone={tone}
      data-review-id={reviewId}
      className={cn("relative isolate", spacingClass[spacing], className)}
      {...props}
    >
      {ambient && <Ambient variant={ambient} drift={drift} />}
      {children}
    </Tag>
  );
}
