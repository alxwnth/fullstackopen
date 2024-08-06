import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import Blog from "./Blog";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

export const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const deleteBlog = async (id) => {
    const blog = blogs.find((n) => n.id === id);

    if (confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        dispatch(
          setNotification(
            {
              text: `Blog ${blog.title} was successfully removed`,
              isError: false,
            },
            5000
          )
        );
        dispatch(removeBlog(id));
      } catch (e) {
        console.error(e);
        dispatch(
          setNotification(
            {
              text: `Blog ${blog.title} was already removed from server`,
              isError: true,
            },
            5000
          )
        );
      }
    }
  };

  const incrementLikes = async (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    changedBlog.user = blog.user.id;
    delete changedBlog.id;

    try {
      await blogService.update(id, changedBlog);
      dispatch(likeBlog(id));
    } catch (e) {
      console.error(e);
      dispatch(
        setNotification(
          {
            text: `Blog ${blog.title} was already removed from server`,
            isError: true,
          },
          5000
        )
      );
    }
  };

  return [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        currentUser={user}
        incrementLikes={() => incrementLikes(blog.id)}
        deleteBlog={() => deleteBlog(blog.id)}
      />
    ));
};
