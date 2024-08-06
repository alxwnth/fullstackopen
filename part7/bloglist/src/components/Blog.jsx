import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, incrementLikes, currentUser, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const deleteButton =
    blog.user.username === currentUser.username ? (
      <button onClick={deleteBlog}>delete</button>
    ) : null;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="blog">
        <div data-testid="blog-header">
          {blog.title} {blog.author}
        </div>
        <button onClick={toggleVisibility} className="toggle-blog">
          view
        </button>
      </div>
      <div style={showWhenVisible} className="blog-contents">
        <p>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility} className="hide">
            hide
          </button>
        </p>
        <p>{blog.url}</p>
        <p>
          <span>likes {blog.likes} </span>
          <button onClick={incrementLikes} className="like">
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {deleteButton}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementLikes: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
