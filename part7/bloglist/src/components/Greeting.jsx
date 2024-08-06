import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../reducers/currentUserReducer";
import { setNotification } from "../reducers/notificationReducer";

export const Greeting = () => {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(clearUser());
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

  const user = useSelector((state) => state.user);
  if (user) {
    return (
      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>
    );
  }
};
