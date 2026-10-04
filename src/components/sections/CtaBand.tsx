import { ArrowRightIcon, MessageCircleIcon } from "lucide-react";

import { Container, Grid } from "@/components/layout/Container";
import { Section, type Tone } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/data/types";

export type CtaBandProps = {
  title: string;
  body: string;
  action: NavItem;
  whatsapp?: NavItem;
  promise?: string;
  tone?: Tone;
  reviewId?: string;
};

export function CtaBand({
  title,
  body,
  action,
  whatsapp,
  promise,
  tone = "inverse",
  reviewId,
}: CtaBandProps) {
  return (
    <Section tone={tone} ambient="corner" reviewId={reviewId}>
      <Container>
        <Grid className="gap-y-10 reveal lg:items-end">
          <div className="col-span-full flex flex-col gap-6 lg:col-span-7">
            <h2 className="text-h1">{title}</h2>
            <p className="max-w-xl text-lead text-muted-foreground">{body}</p>
          </div>
          <div className="col-span-full flex flex-col items-start gap-5 lg:col-span-4 lg:col-start-9">
            <div className="flex w-full flex-col gap-3 sm:w-auto lg:w-full">
              <Button asChild size="lg">
                <a href={action.href}>
                  {action.label}
                  <ArrowRightIcon />
                </a>
              </Button>
              {whatsapp && (
                <Button asChild size="lg" variant="outline">
                  <a href={whatsapp.href} rel="noopener">
                    <MessageCircleIcon />
                    {whatsapp.label}
                  </a>
                </Button>
              )}
            </div>
            {promise && (
              <p className="text-sm text-muted-foreground">{promise}</p>
            )}
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
