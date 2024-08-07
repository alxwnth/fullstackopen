import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { appendBlog, setBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";
import { BlogList } from "./BlogList";
import Togglable from "./Togglable";

export const MainPage = () => {
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs));
    });
  }, []);

  const addBlog = async (blogObject) => {
    const response = await blogService.create(blogObject);
    dispatch(appendBlog(response));
    dispatch(
      setNotification(
        { text: `A new blog ${response.title} added`, isError: false },
        5000
      )
    );
  };

  return (
    <>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList />
    </>
  );
};
