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
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("bob");
      await page.getByTestId("password").fill("supersecure");
      await page.getByRole("button", { name: "login" }).click();
    });

    test.only("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("blog-title").fill("blog title created with test");
      await page.getByTestId("blog-author").fill("Blog Author");
      await page.getByTestId("blog-url").fill("https://example.com");
      await page.getByRole("button", { name: "Create" }).click();
      await expect(
        page
          .getByTestId("blog-header")
          .and(page.getByText("blog title created with test"))
      ).toBeVisible();
    });
  });
});
