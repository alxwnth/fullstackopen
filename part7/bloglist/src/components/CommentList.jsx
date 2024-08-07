import { List, ListItem } from "@mui/material";

export const CommentList = ({ blog }) => {
  return (
    <List>
      {blog.comments.map((comment) => (
        <ListItem key={comment.id}>{comment.comment}</ListItem>
      ))}
    </List>
  );
};
