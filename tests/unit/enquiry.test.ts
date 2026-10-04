import { describe, expect, it } from "vitest";

import { emptyEnquiry, isPlanChoice, validateEnquiry } from "@/lib/enquiry";

const valid = {
  ...emptyEnquiry,
  name: "Sita Sharma",
  email: "sita@example.com",
  message: "We want an online shop with eSewa and Khalti.",
};

describe("validateEnquiry", () => {
  it("accepts a complete enquiry", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it("starts every message with the field name", () => {
    const errors = validateEnquiry({
      ...valid,
      name: "S",
      email: "sita@",
      phone: "call me",
      message: "Hi",
    });
    expect(errors.name).toMatch(/^Name: /);
    expect(errors.email).toMatch(/^Email: /);
    expect(errors.phone).toMatch(/^Phone: /);
    expect(errors.message).toMatch(/^Message: /);
  });

  it("allows an empty phone and international formats", () => {
    expect(validateEnquiry({ ...valid, phone: "" }).phone).toBeUndefined();
    expect(
      validateEnquiry({ ...valid, phone: "+44 (0)20 7946 0958" }).phone,
    ).toBeUndefined();
  });

  it("rejects unknown plans and budgets", () => {
    const errors = validateEnquiry({ ...valid, plan: "gold", budget: "lots" });
    expect(errors.plan).toBeDefined();
    expect(errors.budget).toBeDefined();
  });

  it("recognises plan query values", () => {
    expect(isPlanChoice("scale")).toBe(true);
    expect(isPlanChoice("enterprise")).toBe(false);
    expect(isPlanChoice(null)).toBe(false);
  });
});
