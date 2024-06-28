import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect } from "vitest";

test("renders content", () => {
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

  const { container } = render(
    <Blog
      blog={blog}
      currentUser={currentUser}
      incrementLikes={() => {}}
      deleteBlog={() => {}}
    />
  );

  const blogDiv = container.querySelector(".blog");

  expect(blogDiv).toBeDefined();
  expect(blogDiv).toHaveTextContent("The Practical Test Pyramid Ham Vocke");
  expect(blogDiv).not.toHaveTextContent("likes 0");
});
