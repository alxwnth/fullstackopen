import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { addComment, likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import commentService from "../services/comments";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const deleteBlog = async () => {
    if (confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        <Navigate to="/" />;
        dispatch(
          setNotification(
            {
              text: `Blog ${blog.title} was successfully removed`,
              isError: false,
            },
            5000
          )
        );
        dispatch(removeBlog(blog.id));
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

  const incrementLikes = async () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    changedBlog.user = blog.user.id;
    delete changedBlog.id;

    try {
      await blogService.update(blog.id, changedBlog);
      dispatch(likeBlog(blog.id));
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

  const submitNewComment = async (commentObject) => {
    const response = await commentService.create(blog.id, commentObject);
    dispatch(addComment({ id: blog.id, comment: response }));
  };

  const deleteButton =
    blog.user.username === currentUser.username ? (
      <Button onClick={deleteBlog} variant="outlined">
        Delete
      </Button>
    ) : null;

  return (
    <Stack spacing={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">{blog.title}</Typography>
          <Typography variant="subtitle1">added by{blog.user.name}</Typography>
          <Typography variant="body1" gutterBottom>
            {blog.url}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Likes: {blog.likes}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={incrementLikes} variant="outlined">
            like
          </Button>
          {deleteButton}
        </CardActions>
      </Card>
      <CommentForm createComment={submitNewComment} />
      <CommentList blog={blog} />
    </Stack>
  );
};

export default Blog;
