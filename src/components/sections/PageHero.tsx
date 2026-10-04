import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container, Grid } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { NavItem } from "@/data/types";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  intro?: string;
  breadcrumbs?: NavItem[];
  meta?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  reviewId?: string;
  wide?: boolean;
};

export function PageHero({
  title,
  intro,
  breadcrumbs,
  meta,
  aside,
  children,
  reviewId,
  wide = false,
}: PageHeroProps) {
  return (
    <Section
      tone="deep"
      spacing="none"
      ambient="corner"
      reviewId={reviewId}
      className="under-header overflow-x-clip pb-16 md:pb-20 lg:pb-24"
    >
      <Container>
        {breadcrumbs && breadcrumbs.length > 1 && (
          <Breadcrumbs items={breadcrumbs} className="mb-10 md:mb-12" />
        )}
        <Grid className="gap-y-8 lg:items-end">
          <div
            className={cn(
              "col-span-full flex flex-col gap-8",
              wide ? "lg:col-span-10" : "lg:col-span-8",
            )}
          >
            <h1 className="text-h1">{title}</h1>
            {intro && (
              <p className="max-w-2xl text-lead text-muted-foreground">
                {intro}
              </p>
            )}
            {meta}
          </div>
          {aside && (
            <div className="col-span-full lg:col-span-3 lg:col-start-10">
              {aside}
            </div>
          )}
        </Grid>
        {children}
      </Container>
    </Section>
  );
}
