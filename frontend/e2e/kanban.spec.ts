import { test, expect } from "@playwright/test";

test.describe("Kanban Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("smoke: page loads with 5 columns and dummy cards", async ({ page }) => {
    await expect(page.getByText("Kanban Board")).toBeVisible();

    // All 5 default column titles visible (exact match to avoid card text collisions)
    for (const title of ["Backlog", "To Do", "In Progress", "Review", "Done"]) {
      await expect(
        page.getByRole("button", { name: title, exact: true })
      ).toBeVisible();
    }

    // At least one card is visible
    await expect(page.getByText("User authentication flow")).toBeVisible();
  });

  test("rename column: double-click title and type new name", async ({ page }) => {
    const colBtn = page.getByRole("button", { name: "Backlog", exact: true });
    await colBtn.dblclick();

    // After double-click, an input appears replacing the button
    const input = page.getByRole("textbox");
    await expect(input).toBeVisible();
    await input.selectText();
    await input.fill("Ideas");
    await input.press("Enter");

    await expect(
      page.getByRole("button", { name: "Ideas", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Backlog", exact: true })
    ).not.toBeVisible();
  });

  test("add card: fill form and verify card appears", async ({ page }) => {
    // Open the add card form in the first column (Backlog)
    const addTriggers = page.getByRole("button", { name: /^Add card$/ });
    await addTriggers.first().click();

    await page.getByPlaceholder("Card title").fill("Test card title");
    await page.getByPlaceholder("Details (optional)").fill("Test details");

    // Submit via the form's submit button (type="submit")
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText("Test card title")).toBeVisible();
  });

  test("delete card: hover and click delete, card is removed", async ({ page }) => {
    const card = page.getByText("User authentication flow");
    await expect(card).toBeVisible();

    await card.hover();

    const cardContainer = page.locator(".group").filter({ has: card });
    const deleteBtn = cardContainer.getByRole("button", { name: "Delete card" });
    await deleteBtn.click();

    await expect(page.getByText("User authentication flow")).not.toBeVisible();
  });

  test("drag and drop: move card from Backlog to To Do", async ({ page }) => {
    const sourceCard = page.getByText("API rate limiting");
    await expect(sourceCard).toBeVisible();

    const sourceBox = await sourceCard.boundingBox();
    const destColumn = page.getByRole("button", { name: "To Do", exact: true });
    const destBox = await destColumn.boundingBox();

    if (!sourceBox || !destBox) throw new Error("Could not get bounding boxes");

    await page.mouse.move(
      sourceBox.x + sourceBox.width / 2,
      sourceBox.y + sourceBox.height / 2
    );
    await page.mouse.down();
    await page.waitForTimeout(300);
    await page.mouse.move(destBox.x + destBox.width / 2, destBox.y + 60, {
      steps: 20,
    });
    await page.waitForTimeout(200);
    await page.mouse.up();

    await expect(page.getByText("API rate limiting")).toBeVisible();
  });
});
