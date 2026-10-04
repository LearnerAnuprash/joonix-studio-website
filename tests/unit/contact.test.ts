import { describe, expect, it } from "vitest";

import { emailHref, formatPhone, phoneHref, whatsappHref } from "@/lib/contact";

describe("contact links", () => {
  it("builds tel and WhatsApp links from any formatting", () => {
    expect(phoneHref("+977 980-0000000")).toBe("tel:+9779800000000");
    expect(whatsappHref("+977 980-0000000")).toBe(
      "https://wa.me/9779800000000",
    );
  });

  it("encodes WhatsApp prefill text", () => {
    expect(whatsappHref("9779800000000", "Hi, plan: scale")).toBe(
      "https://wa.me/9779800000000?text=Hi%2C%20plan%3A%20scale",
    );
  });

  it("formats Nepali mobile numbers for display", () => {
    expect(formatPhone("+9779800000000")).toBe("+977 980-0000000");
    expect(formatPhone("+441234567890")).toBe("+441234567890");
  });

  it("adds an encoded subject to email links", () => {
    expect(emailHref("a@b.co", "New project")).toBe(
      "mailto:a@b.co?subject=New%20project",
    );
  });
});
