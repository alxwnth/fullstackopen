import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const titleInput = container.querySelector("#blogTitle");
  const authorInput = container.querySelector("#blogAuthor");
  const urlInput = container.querySelector("#blogUrl");
  const submitButton = container.querySelector("#submitBlog");

  await user.type(titleInput, "Title of the blog");
  await user.type(authorInput, "Author of the blog");
  await user.type(urlInput, "Url of the blog");
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Title of the blog");
  expect(createBlog.mock.calls[0][0].author).toBe("Author of the blog");
  expect(createBlog.mock.calls[0][0].url).toBe("Url of the blog");
});
