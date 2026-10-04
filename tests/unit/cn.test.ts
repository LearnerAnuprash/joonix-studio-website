import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("keeps a custom font size next to a text colour", () => {
    expect(cn("text-h1", "text-foreground")).toBe("text-h1 text-foreground");
  });

  it("lets a later font size replace an earlier one", () => {
    expect(cn("text-display", "text-h1")).toBe("text-h1");
  });

  it("lets a later colour replace an earlier one", () => {
    expect(cn("text-muted-foreground", "text-foreground")).toBe(
      "text-foreground",
    );
  });

  it("lets className override a variant height", () => {
    expect(cn("h-12 px-6", "h-auto px-0")).toBe("h-auto px-0");
  });

  it("drops falsy values", () => {
    expect(cn("block", false, undefined, "rounded-md")).toBe(
      "block rounded-md",
    );
  });
});
