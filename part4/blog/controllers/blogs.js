const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
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

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const encodedToken = request.token;

  if (!encodedToken)
    return response.status(401).json({ error: "no token provided" });

  const decodedToken = jwt.verify(encodedToken, process.env.SECRET);
  if (!decodedToken.id)
    return response.status(401).json({ error: "token invalid" });

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const user = request.user;

  const blog = new Blog(body);
  blog.user = user.id;

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const encodedToken = request.token;

    if (!encodedToken)
      return response.status(401).json({ error: "no token provided" });

    const decodedToken = jwt.verify(encodedToken, process.env.SECRET);
    if (!decodedToken.id)
      return response.status(401).json({ error: "token invalid" });

    try {
      const blog = await Blog.findById(request.params.id);
      const user = request.user;
      if (blog.user.toString() === user.id.toString()) {
        await blog.deleteOne();
        response.status(204).end();
      } else {
        response.status(401).json({ error: "not authorized" });
      }
    } catch (e) {
      next(e);
    }
  }
);

blogsRouter.put(
  "/:id",
  middleware.userExtractor,
  async (request, response, next) => {
    const body = request.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        {
          new: true,
        }
      );
      response.json(updatedBlog);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = blogsRouter;
