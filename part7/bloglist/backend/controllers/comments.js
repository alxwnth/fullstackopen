const commentsRouter = require("express").Router();

const Blog = require("../models/blog");
const Comment = require("../models/comment");

commentsRouter.get("/:id/comments", async (request, response) => {
  const comments = await Blog.findById(request.params.id).populate("comments");

  response.json(comments);
});

commentsRouter.post("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    comment: request.body.comment,
  });

  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(savedComment.toJSON());
});

module.exports = commentsRouter;
