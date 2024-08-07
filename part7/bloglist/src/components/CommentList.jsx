export const CommentList = ({ blog }) => {
  return (
    <ul>
      {blog.comments.map((comment) => (
        <li key={comment.id}>{comment.comment}</li>
      ))}
    </ul>
  );
};
