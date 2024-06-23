const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (e) {
    next(e);
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const blog = new Blog(body);
  const result = await blog.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = blogsRouter;
