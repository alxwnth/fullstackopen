const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

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
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Alice Brown",
        username: "alice",
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
      await loginWith(page, "bob", "supersecure");
      await expect(page.getByText("Bob Smith logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "bob", "wrong");
      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("Wrong credentials");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "bob", "supersecure");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "blog title created with test",
        "Blog Author",
        "https://example.com"
      );
      await expect(
        page
          .getByTestId("blog-header")
          .and(page.getByText("blog title created with test"))
      ).toBeVisible();
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "blog title created with test",
          "Blog Author",
          "https://example.com"
        );
      });

      test("blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await page.getByText("likes 1").waitFor();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("blog can be deleted", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "delete" }).click();
        await expect(
          page.getByText(
            "Blog blog title created with test was successfully removed"
          )
        ).toBeVisible();
      });

      test("blog can be deleted only by submitter", async ({ page }) => {
        await page.getByRole("button", { name: "log out" }).click();
        await loginWith(page, "alice", "supersecure");
        await page.getByRole("button", { name: "view" }).click();
        await expect(
          page.getByRole("button", { name: "delete" })
        ).not.toBeVisible();
      });
    });

    describe("and several blogs exist", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "one blog",
          "Blog Author",
          "https://example.com"
        );
        await createBlog(
          page,
          "another blog",
          "Another Author",
          "https://example.com"
        );
      });

      test.only("blogs are arranged by likes", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).first().click();

        await page
          .getByRole("button", { name: "like" })
          .click({ clickCount: 2, delay: 600 });

        await page.getByRole("button", { name: "view" }).last().click();
        await page
          .getByRole("button", { name: "like" })
          .last()
          .click({ clickCount: 3, delay: 600 });

        expect(page.locator(".blog").first()).toContainText("another blog");
      });
    });
  });
});
