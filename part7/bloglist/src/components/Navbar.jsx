import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Blogs"
          icon={<InboxIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Users"
          icon={<PersonIcon />}
          component={Link}
          to="/users"
        />
      </BottomNavigation>
    </Paper>
  );
};
