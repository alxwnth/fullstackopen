import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { Greeting } from "./components/Greeting";
import { LoginForm } from "./components/LoginForm";
import { MainPage } from "./components/MainPage";
import NotificationBox from "./components/NotificationBox";
import { Users } from "./components/Users";
import { setUser } from "./reducers/currentUserReducer";
import blogService from "./services/blogs";
import "./style.css";
import { Navbar } from "./components/Navbar";

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
      <div>
        <Navbar />
        <NotificationBox />
        <Routes>
          <Route path="/*" element={<MainPage />} />
          <Route path="/users/*" element={<Users />} />
        </Routes>
      </div>
    );
  } else {
    return <LoginForm />;
  }
};

export default App;
