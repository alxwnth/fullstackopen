import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/currentUserReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
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

  if (!user) {
    return (
      <div>
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
};
