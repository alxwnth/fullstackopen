const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const config = require("./utils/config");
const { unknownEndpoint, errorHandler } = require("./utils/errorHandler");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
