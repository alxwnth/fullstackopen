import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { Link, Route, Routes, useMatch } from "react-router-dom";

export const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <Routes>
      <Route
        path="/"
        element={[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
      />
      <Route
        path="blogs/:id"
        element={<Blog blog={blog} currentUser={user} />}
      />
    </Routes>
  );
};
