import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

const blog = {
  title: "The Practical Test Pyramid",
  author: "Ham Vocke",
  url: "https://example.com",
  likes: 0,
  user: {
    username: "alice",
    name: "Alice",
    id: "667d54af5cf44cbf93fdb9f2",
  },
  id: "667d54bf5cf44cbf93fdb9f6",
};

const currentUser = {
  username: "alice",
  name: "Alice",
  id: "667d54af5cf44cbf93fdb9f2",
};

test("renders content", () => {
  const mockHandler = vi.fn();
  const { container } = render(
    <Blog
      blog={blog}
      currentUser={currentUser}
      incrementLikes={mockHandler}
      deleteBlog={mockHandler}
    />
  );

  const blogDiv = container.querySelector(".blog");

  expect(blogDiv).toBeDefined();
  expect(blogDiv).toHaveTextContent("The Practical Test Pyramid Ham Vocke");

  const blogContents = container.querySelector(".blog-contents");
  expect(blogContents).toHaveStyle("display: none;");
});

test("after clicking the button, blog contents are displayed", async () => {
  const mockHandler = vi.fn();
  const { container } = render(
    <Blog
      blog={blog}
      currentUser={currentUser}
      incrementLikes={mockHandler}
      deleteBlog={mockHandler}
    />
  );
  const user = userEvent.setup();

  const button = container.querySelector(".toggle-blog");
  await user.click(button);
  const blogContents = container.querySelector(".blog-contents");
  expect(blogContents).not.toHaveStyle("display: none;");
});

test("clicking the button twice calls event handler twice", async () => {
  const mockHandler = vi.fn();

  const { container } = render(
    <Blog
      blog={blog}
      currentUser={currentUser}
      incrementLikes={mockHandler}
      deleteBlog={mockHandler}
    />
  );

  const user = userEvent.setup();

  const likeButton = container.querySelector(".like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
