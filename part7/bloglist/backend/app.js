const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const config = require("./utils/config");
const { unknownEndpoint, errorHandler } = require("./utils/errorHandler");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const middleware = require("./utils/middleware");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
