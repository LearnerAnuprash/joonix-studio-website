import { describe, expect, it } from "vitest";

import {
  formatDate,
  formatMoney,
  formatMoneyParts,
  formatMoneyRange,
  isoDay,
} from "@/lib/format";

describe("formatMoney", () => {
  it("uses lakh grouping", () => {
    expect(formatMoney(15000)).toBe("Rs. 15,000");
    expect(formatMoney(150000)).toBe("Rs. 1,50,000");
    expect(formatMoney(1500000)).toBe("Rs. 15,00,000");
  });

  it("formats ranges with the second value bare", () => {
    expect(formatMoneyRange(15000, 35000)).toBe("Rs. 15,000 to 35,000");
    expect(formatMoneyRange(2000)).toBe("Rs. 2,000");
    expect(formatMoneyRange(2000, 2000)).toBe("Rs. 2,000");
  });

  it("splits ranges into parts that wrap at the word to", () => {
    expect(formatMoneyParts(150000, 300000)).toEqual([
      "Rs. 1,50,000",
      "to 3,00,000",
    ]);
    expect(formatMoneyParts(2000)).toEqual(["Rs. 2,000"]);
  });
});

describe("dates in Asia/Kathmandu", () => {
  it("formats a long date", () => {
    expect(formatDate(new Date("2026-09-14T00:00:00+05:45"))).toBe(
      "14 September 2026",
    );
  });

  it("rolls over to the next day after 18:15 UTC", () => {
    expect(isoDay(new Date("2026-09-14T18:14:00Z"))).toBe("2026-09-14");
    expect(isoDay(new Date("2026-09-14T18:15:00Z"))).toBe("2026-09-15");
  });
});
