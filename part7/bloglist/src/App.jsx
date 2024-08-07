import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Greeting } from "./components/Greeting";
import { LoginForm } from "./components/LoginForm";
import { MainPage } from "./components/MainPage";
import NotificationBox from "./components/NotificationBox";
import { Users } from "./components/Users";
import { setUser } from "./reducers/currentUserReducer";
import blogService from "./services/blogs";
import "./style.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <NotificationBox />
      <LoginForm />
      <Greeting />
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/users/*" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
