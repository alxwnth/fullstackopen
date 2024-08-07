import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import { likeBlog, removeBlog, addComment } from "../reducers/blogReducer";
import { Navigate } from "react-router-dom";
import { CommentForm } from "./CommentForm";
import commentService from "../services/comments";
import { CommentList } from "./CommentList";
import { useEffect, useState } from "react";

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const deleteBlog = async () => {
    if (confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        <Navigate to="/" />;
        dispatch(
          setNotification(
            {
              text: `Blog ${blog.title} was successfully removed`,
              isError: false,
            },
            5000
          )
        );
        dispatch(removeBlog(blog.id));
      } catch (e) {
        console.error(e);
        dispatch(
          setNotification(
            {
              text: `Blog ${blog.title} was already removed from server`,
              isError: true,
            },
            5000
          )
        );
      }
    }
  };

  const incrementLikes = async () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    changedBlog.user = blog.user.id;
    delete changedBlog.id;

    try {
      await blogService.update(blog.id, changedBlog);
      dispatch(likeBlog(blog.id));
    } catch (e) {
      console.error(e);
      dispatch(
        setNotification(
          {
            text: `Blog ${blog.title} was already removed from server`,
            isError: true,
          },
          5000
        )
      );
    }
  };

  const submitNewComment = async (commentObject) => {
    const response = await commentService.create(blog.id, commentObject);
    dispatch(addComment({ id: blog.id, comment: response }));
  };

  const deleteButton =
    blog.user.username === currentUser.username ? (
      <button onClick={deleteBlog}>delete</button>
    ) : null;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>
        <span>likes {blog.likes} </span>
        <button onClick={incrementLikes} className="like">
          like
        </button>
      </p>
      <p>added by{blog.user.name}</p>
      {deleteButton}
      <CommentForm createComment={submitNewComment} />
      <CommentList blog={blog} />
    </div>
  );
};

export default Blog;
