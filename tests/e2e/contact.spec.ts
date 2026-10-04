import { expect, test, type Page } from "@playwright/test";

async function fill(page: Page) {
  await page.getByLabel("Your name").fill("Sita Sharma");
  await page.getByLabel("Email").fill("sita@example.com");
  await page
    .getByLabel("Tell us about the project")
    .fill("We sell pashmina on Instagram and want our own shop.");
}

test.describe("contact form", () => {
  test("preselects the plan from the query string", async ({ page }) => {
    await page.goto("/contact?plan=scale");
    await page.getByLabel("Your name").focus();
    await expect(page.getByLabel("What do you need?")).toHaveValue("scale");
  });

  test("shows field errors and focuses the first one", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Your name").focus();
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(
      page.getByText("Name: enter at least 2 characters."),
    ).toBeVisible();
    await expect(page.getByText(/^Email: /)).toBeVisible();
    await expect(page.getByLabel("Your name")).toBeFocused();
    await expect(page.getByLabel("Your name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("keeps text typed before hydration and shows success", async ({
    page,
  }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, json: { ok: true } }),
    );
    await page.goto("/contact");
    await fill(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(
      page.getByRole("heading", {
        name: /Thanks, Sita\. Your enquiry is with us\./,
      }),
    ).toBeVisible();
  });

  test("explains a server failure and keeps the input", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 500, json: { ok: false } }),
    );
    await page.goto("/contact");
    await fill(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("alert")).toContainText(
      "did not send because of a problem on our side",
    );
    await expect(page.getByLabel("Your name")).toHaveValue("Sita Sharma");
  });
});
