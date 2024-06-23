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

describe.only("blog", () => {
  test("list is returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("list returns correct number", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });
  test("has id, not _id", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(
      response.body[0].id !== undefined && response.body[0]._id === undefined,
      true
    );
  });
  test("is created successfully", async () => {
    const testBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 0,
    };

    const response = await api
      .post("/api/blogs")
      .send(testBlog)
      .set("Content-Type", "application/json")
      .expect(201);

    const getResponse = await api.get("/api/blogs");

    assert.strictEqual(getResponse.body.length, helper.initialBlogs.length + 1);
    assert.strictEqual(response.body.title, "React patterns");
  });
  test("is created even without likes property", async () => {
    const testBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
    };

    const response = await api
      .post("/api/blogs")
      .send(testBlog)
      .set("Content-Type", "application/json")
      .expect(201);

    assert.strictEqual(response.body.likes, 0);
  });
  test.only("is not created without required fields", async () => {
    const testBlog = {
      author: "Michael Chan",
    };

    await api
      .post("/api/blogs")
      .send(testBlog)
      .set("Content-Type", "application/json")
      .expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
