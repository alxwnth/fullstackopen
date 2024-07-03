import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <label htmlFor="blogTitle">title:</label>
      <input
        id="blogTitle"
        value={title}
        onChange={handleTitleChange}
        data-testid="blog-title"
      ></input>
      <br />
      <label htmlFor="blogAuthor">author:</label>
      <input
        id="blogAuthor"
        value={author}
        onChange={handleAuthorChange}
        data-testid="blog-author"
      ></input>
      <br />
      <label htmlFor="blogUrl">url:</label>
      <input
        id="blogUrl"
        value={url}
        onChange={handleUrlChange}
        data-testid="blog-url"
      ></input>
      <br />
      <input type="submit" value="Create" id="submitBlog" />
    </form>
  );
};

export default BlogForm;
