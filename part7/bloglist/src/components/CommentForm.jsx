import React, { useState } from "react";

export const CommentForm = ({ createComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(comment);
    createComment(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="blogTitle">comment:</label>
      <input
        id="blogComment"
        value={comment}
        onChange={handleCommentChange}
        min={1}
      ></input>
      <input type="submit" value="Create" id="submitComment" />
    </form>
  );
};
