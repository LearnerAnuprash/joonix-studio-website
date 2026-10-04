import type { ReactNode } from "react";

import type { Tone } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type ToneSampleProps = {
  tone: Tone;
  title: string;
  inputId: string;
  readout?: ReactNode;
};

export function ToneSample({ tone, title, inputId, readout }: ToneSampleProps) {
  return (
    <div
      data-tone={tone}
      className="flex flex-col gap-6 rounded-lg border border-border p-6"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-h4">{title}</h3>
        <p className="text-sm text-muted-foreground">
          A written scope, a fixed price and a weekly preview link.{" "}
          <a href="#tones" className="text-foreground link">
            Read the process
          </a>
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="sm">Start a project</Button>
        <Button size="sm" variant="outline">
          See pricing
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={inputId}>Email</Label>
        <Input id={inputId} type="email" placeholder="you@company.com" />
      </div>
      <Separator />
      {readout}
    </div>
  );
}
