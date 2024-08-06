import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NotificationBox from "./components/NotificationBox";
import "./style.css";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchData = async () =>
      blogService.getAll().then((blogs) => setBlogs(blogs));
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const response = await blogService.create(blogObject);
    setBlogs(blogs.concat(response));
    dispatch(
      setNotification(
        { text: `A new blog ${response.title} added`, isError: false },
        5000
      )
    );
  };

  const incrementLikes = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    changedBlog.user = blog.user.id;
    delete changedBlog.id;

    try {
      const returnedBlog = await blogService.update(id, changedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
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

  const deleteBlog = async (id) => {
    const blog = blogs.find((n) => n.id === id);

    if (confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        dispatch(
          setNotification(
            {
              text: `Blog ${blog.title} was successfully removed`,
              isError: false,
            },
            5000
          )
        );
        setBlogs(blogs.filter((b) => b.id !== blog.id));
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(
        setNotification(
          {
            text: `Welcome, ${user.name}!`,
            isError: false,
          },
          5000
        )
      );
    } catch (e) {
      dispatch(
        setNotification(
          {
            text: "Wrong credentials",
            isError: true,
          },
          5000
        )
      );
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem("blogAppUser");
    dispatch(
      setNotification(
        {
          text: `${user.name} logged out`,
          isError: false,
        },
        5000
      )
    );
  };

  if (user === null) {
    return (
      <div>
        <NotificationBox message={message} />
        <h2>Log into the application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              data-testid="username"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              data-testid="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <NotificationBox message={message} />
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            currentUser={user}
            incrementLikes={() => incrementLikes(blog.id)}
            deleteBlog={() => deleteBlog(blog.id)}
          />
        ))}
    </div>
  );
};

export default App;
