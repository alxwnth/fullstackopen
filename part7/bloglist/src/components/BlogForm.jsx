import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
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
    <Box component="form" noValidate autoComplete="off" onSubmit={addBlog}>
      <TextField
        label="Title"
        fullWidth
        value={title}
        margin="normal"
        onChange={handleTitleChange}
      />
      <TextField
        label="Author"
        fullWidth
        value={author}
        margin="normal"
        onChange={handleAuthorChange}
      />
      <TextField
        label="URL"
        fullWidth
        value={url}
        margin="normal"
        onChange={handleUrlChange}
      />
      <Button variant="contained" type="submit">
        Add
      </Button>
    </Box>
  );
};

export default BlogForm;
