import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/currentUserReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";

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
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <TextField
            label="Username"
            fullWidth
            value={username}
            margin="normal"
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            type="password"
            fullWidth
            label="Password"
            value={password}
            margin="normal"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </div>
    );
  }
};
