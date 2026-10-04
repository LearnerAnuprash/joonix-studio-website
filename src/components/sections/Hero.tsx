import { ArrowRightIcon } from "lucide-react";

import { RidgeLine } from "@/components/brand/RidgeLine";
import { Container, Grid } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Media } from "@/components/media/Media";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/data/types";
import { cn } from "@/lib/utils";

export type HeroVariant = "ridge" | "work";

export type HeroProps = {
  variant?: HeroVariant;
  headline: string;
  intro: string;
  action: NavItem;
  note?: string;
};

type HeroActionsProps = Pick<HeroProps, "action" | "note"> & {
  className?: string;
};

function HeroActions({ action, note, className }: HeroActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6",
        className,
      )}
    >
      <Button asChild>
        <a href={action.href}>
          {action.label}
          <ArrowRightIcon />
        </a>
      </Button>
      {note && <p className="max-w-xs text-sm text-muted-foreground">{note}</p>}
    </div>
  );
}

function RidgeHero({ headline, intro, action, note }: HeroProps) {
  return (
    <Section
      tone="deep"
      spacing="none"
      ambient="horizon"
      drift
      reviewId="H-01"
      className="under-header overflow-x-clip"
    >
      <Container>
        <Grid>
          <h1 className="col-span-full text-display lg:col-span-10">
            {headline}
          </h1>
          <p className="col-span-full mt-8 text-lead text-muted-foreground md:col-span-6">
            {intro}
          </p>
          <HeroActions
            action={action}
            note={note}
            className="col-span-full mt-10"
          />
        </Grid>
      </Container>
      <RidgeLine className="mt-16 lg:mt-20" />
    </Section>
  );
}

function WorkHero({ headline, intro, action, note }: HeroProps) {
  return (
    <Section
      tone="deep"
      spacing="none"
      ambient="horizon"
      drift
      reviewId="H-01"
      className="under-header overflow-x-clip pb-(--section-pad)"
    >
      <Container>
        <Grid className="gap-y-16 lg:items-end">
          <div className="col-span-full lg:col-span-6">
            <h1 className="text-h1">{headline}</h1>
            <p className="mt-8 text-lead text-muted-foreground">{intro}</p>
            <HeroActions action={action} note={note} className="mt-10" />
          </div>
          <Media
            ratio="4 / 3"
            priority
            className="col-span-full bleed-end rounded-r-none border-r-0 lg:col-span-6 lg:col-start-7"
          />
        </Grid>
      </Container>
    </Section>
  );
}

export function Hero({ variant = "ridge", ...props }: HeroProps) {
  return variant === "work" ? (
    <WorkHero {...props} />
  ) : (
    <RidgeHero {...props} />
  );
}
