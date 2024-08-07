import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton, ListItemText } from "@mui/material";

export const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <List>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <ListItem key={blog.id}>
                  <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                    <ListItemText primary={blog.title} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        }
      />
      <Route
        path="blogs/:id"
        element={<Blog blog={blog} currentUser={user} />}
      />
    </Routes>
  );
};
