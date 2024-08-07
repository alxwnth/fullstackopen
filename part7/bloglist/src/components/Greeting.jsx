import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome, {user.name}!
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Log out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
};
