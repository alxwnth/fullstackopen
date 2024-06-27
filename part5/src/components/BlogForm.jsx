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
      <input id="blogTitle" value={title} onChange={handleTitleChange}></input>
      <br />
      <label htmlFor="blogAuthor">author:</label>
      <input
        id="blogAuthor"
        value={author}
        onChange={handleAuthorChange}
      ></input>
      <br />
      <label htmlFor="blogUrl">url:</label>
      <input id="blogUrl" value={url} onChange={handleUrlChange}></input>
      <br />
      <input type="submit" value="Create" />
    </form>
  );
};

export default BlogForm;
