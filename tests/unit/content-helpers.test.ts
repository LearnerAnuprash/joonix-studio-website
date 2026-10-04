import { describe, expect, it } from "vitest";

import { pageCount, pageOf } from "@/lib/paginate";
import { countWords, readingTime } from "@/lib/reading-time";
import { relatedItems } from "@/lib/related";

const post = (
  slug: string,
  date: string,
  tags: string[],
  services: string[] = [],
) => ({
  slug,
  publishDate: new Date(date),
  tags: tags.map((tag) => ({ slug: tag })),
  services,
});

describe("readingTime", () => {
  it("rounds up at 230 words a minute with a minimum of one", () => {
    expect(readingTime("word")).toBe(1);
    expect(readingTime(Array(231).fill("word").join(" "))).toBe(2);
  });

  it("ignores code blocks and markup", () => {
    expect(
      countWords("## Heading\n\n```js\nconst a = 1;\n```\n\nTwo words"),
    ).toBe(3);
  });
});

describe("relatedItems", () => {
  const base = post("base", "2026-01-01", ["pricing"], ["website-design"]);
  const candidates = [
    base,
    post("tag-only", "2026-03-01", ["pricing"]),
    post("service-only", "2026-02-01", ["process"], ["website-design"]),
    post("nothing", "2026-04-01", ["payments"]),
    post("both", "2025-01-01", ["pricing"], ["website-design"]),
  ];

  it("weights services above tags and excludes the post itself", () => {
    expect(relatedItems(base, candidates).map((item) => item.slug)).toEqual([
      "both",
      "service-only",
      "tag-only",
    ]);
  });

  it("falls back to the newest posts", () => {
    const lonely = post("lonely", "2026-01-01", ["other"]);
    expect(
      relatedItems(lonely, candidates, 2).map((item) => item.slug),
    ).toEqual(["nothing", "tag-only"]);
  });
});

describe("pagination", () => {
  it("always has at least one page", () => {
    expect(pageCount(0)).toBe(1);
    expect(pageCount(12)).toBe(1);
    expect(pageCount(13)).toBe(2);
  });

  it("slices the requested page", () => {
    const items = Array.from({ length: 30 }, (_, index) => index);
    expect(pageOf(items, 3)).toEqual({
      items: [24, 25, 26, 27, 28, 29],
      current: 3,
      total: 3,
    });
  });
});
