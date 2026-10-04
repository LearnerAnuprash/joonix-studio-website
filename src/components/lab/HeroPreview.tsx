import { useEffect, useState } from "react";

import { Hero, type HeroProps } from "@/components/sections/Hero";
import { cn } from "@/lib/utils";

type HeroPreviewProps = Omit<HeroProps, "headline"> & {
  headlines: string[];
};

const weights = [400, 500, 600] as const;

type Weight = (typeof weights)[number];

function readParams(headlineCount: number): {
  headline: number;
  weight: Weight;
} {
  const params = new URLSearchParams(window.location.search);
  const headline = Number(params.get("h") ?? "1") - 1;
  const weight = Number(params.get("w") ?? "500");
  return {
    headline: headline >= 0 && headline < headlineCount ? headline : 0,
    weight: weights.find((value) => value === weight) ?? 500,
  };
}

function writeParams(headline: number, weight: Weight) {
  const url = new URL(window.location.href);
  url.searchParams.set("h", String(headline + 1));
  url.searchParams.set("w", String(weight));
  window.history.replaceState(null, "", url);
}

type SegmentProps<T extends string | number> = {
  label: string;
  options: readonly T[];
  value: T;
  format?: (option: T) => string;
  onChange: (option: T) => void;
};

function Segment<T extends string | number>({
  label,
  options,
  value,
  format = String,
  onChange,
}: SegmentProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1">
      <span className="mr-2 text-caption text-muted-foreground">{label}</span>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === value}
          onClick={() => onChange(option)}
          className={cn(
            "h-11 min-w-11 rounded-md border px-3 text-caption font-medium transition-colors duration-150",
            option === value
              ? "border-foreground bg-foreground text-background"
              : "border-input hover:border-foreground",
          )}
        >
          {format(option)}
        </button>
      ))}
    </div>
  );
}

export function HeroPreview({ headlines, ...props }: HeroPreviewProps) {
  const [headline, setHeadline] = useState(
    () => readParams(headlines.length).headline,
  );
  const [weight, setWeight] = useState<Weight>(
    () => readParams(headlines.length).weight,
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--weight-display",
      String(weight),
    );
    writeParams(headline, weight);
  }, [headline, weight]);

  const indexes = headlines.map((_, index) => index);

  return (
    <>
      <Hero {...props} headline={headlines[headline] ?? ""} />
      <div
        data-tone="base"
        className="fixed right-4 bottom-4 z-50 flex flex-wrap justify-end gap-x-6 gap-y-2 rounded-lg border border-input p-2"
      >
        <Segment
          label="Headline"
          options={indexes}
          value={headline}
          format={(index) => String(index + 1)}
          onChange={setHeadline}
        />
        {props.variant !== "work" && (
          <Segment
            label="Weight"
            options={weights}
            value={weight}
            onChange={setWeight}
          />
        )}
      </div>
    </>
  );
}
