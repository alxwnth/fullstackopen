const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    await new Blog(blog).save();
  }
});

describe.only("blogs", () => {
  test("are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("return correct number", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
  test.only("return id, not _id", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(
      response.body[0].id !== undefined && response.body[0]._id === undefined,
      true
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
