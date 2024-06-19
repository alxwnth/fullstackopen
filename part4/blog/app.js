const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const config = require("./utils/config");
const logger = require("./utils/logger");

const blogsRouter = require("./controllers/blogs");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
