import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/services/website-design",
  "/services/application-development",
  "/work",
  "/work/joonix-studio-website",
  "/pricing",
  "/blog",
  "/blog/tag/payments",
  "/blog/how-much-does-a-website-cost-in-nepal",
  "/blog/authors/joonix-studio",
  "/about",
  "/contact",
  "/contact/thanks",
  "/privacy",
  "/terms",
  "/404",
  "/lab",
  "/lab/foundations",
  "/lab/components",
  "/lab/contact-states",
  "/lab/hero/ridge",
  "/lab/hero/work",
];
const themes = ["dark", "light"] as const;

for (const theme of themes) {
  for (const route of routes) {
    test(`${route} has no axe violations in ${theme} theme`, async ({
      page,
    }) => {
      await page.addInitScript((value) => {
        localStorage.setItem("theme", value);
      }, theme);
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
