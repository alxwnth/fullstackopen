import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import BlogForm from "./components/BlogForm";
import { BlogList } from "./components/BlogList";
import { Greeting } from "./components/Greeting";
import { LoginForm } from "./components/LoginForm";
import NotificationBox from "./components/NotificationBox";
import Togglable from "./components/Togglable";
import { appendBlog, setBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/currentUserReducer";
import { setNotification } from "./reducers/notificationReducer";
import blogService from "./services/blogs";
import "./style.css";

const App = () => {
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs));
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
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
    <div>
      <NotificationBox />
      <LoginForm />
      <h2>blogs</h2>
      <Greeting />
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <BlogList />
    </div>
  );
};

export default App;
