const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Bob Smith",
        username: "bob",
        password: "supersecure",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(
      await page.getByRole("button", { name: "login" })
    ).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("bob");
      await page.getByTestId("password").fill("supersecure");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText("Bob Smith logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username").fill("bob");
      await page.getByTestId("password").fill("nuh-uh");
      await page.getByRole("button", { name: "login" }).click();
      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("Wrong credentials");
    });
  });
});
