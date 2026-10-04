import { describe, expect, it } from "vitest";

import { isCurrentPath, normalizePath } from "@/lib/navigation";

describe("normalizePath", () => {
  it.each([
    ["/", "/"],
    ["/blog/", "/blog"],
    ["/blog.html", "/blog"],
    ["/index.html", "/index"],
  ])("%s becomes %s", (input, expected) => {
    expect(normalizePath(input)).toBe(expected);
  });
});

describe("isCurrentPath", () => {
  it("matches the section and its children", () => {
    expect(isCurrentPath("/blog", "/blog")).toBe(true);
    expect(isCurrentPath("/blog/my-post", "/blog")).toBe(true);
  });

  it("does not match a sibling that shares a prefix", () => {
    expect(isCurrentPath("/blogroll", "/blog")).toBe(false);
  });

  it("only matches home on the home page", () => {
    expect(isCurrentPath("/", "/")).toBe(true);
    expect(isCurrentPath("/work", "/")).toBe(false);
  });
});
