import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

export const CommentForm = ({ createComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Comment"
        fullWidth
        value={comment}
        onChange={handleCommentChange}
        min={1}
        margin="normal"
      />
      <Button variant="contained" type="submit">
        Create
      </Button>
    </form>
  );
};
