import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { MainPage } from "./components/MainPage";
import { Navbar } from "./components/Navbar";
import NotificationBox from "./components/NotificationBox";
import { Users } from "./components/Users";
import { Greeting } from "./components/Greeting";
import { setUser } from "./reducers/currentUserReducer";
import blogService from "./services/blogs";
import "./style.css";

const App = () => {
  const dispatch = useDispatch();
  const [user, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      setCurrentUser(user);
    }
  }, []);

  if (user) {
    return (
      <>
        <Greeting />
        <Container>
          <NotificationBox />
          <Routes>
            <Route path="/*" element={<MainPage />} />
            <Route path="/users/*" element={<Users />} />
          </Routes>
          <Navbar />
        </Container>
      </>
    );
  } else {
    return <LoginForm />;
  }
};

export default App;
