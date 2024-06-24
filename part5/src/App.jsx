import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NotificationBox from "./components/NotificationBox";
import "./style.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    const response = await blogService.create(blogObject);
    setBlogs(blogs.concat(response));
    displayNotification(`A new blog ${title} added`, false);
    setTitle("");
    setAuthor("");
    setUrl("");
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
      displayNotification(`Welcome, ${user.name}!`, false);
    } catch (e) {
      displayNotification("Wrong credentials", true);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem("blogAppUser");
    displayNotification(`${user.name} logged out`, false);
  };

  const displayNotification = (text, isError = false) => {
    setMessage({
      text: text,
      isError: isError,
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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
        <form onSubmit={addBlog}>
          <label htmlFor="blogTitle">title:</label>
          <input
            id="blogTitle"
            value={title}
            onChange={handleTitleChange}
          ></input>
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
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
