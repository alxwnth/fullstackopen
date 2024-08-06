const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

let jwt;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const newUser = {
    username: "bobsmith",
    name: "Bob Smith",
    password: "supersecure",
  };
  await api.post("/api/users").send(newUser);

  const userToLogin = {
    username: "bobsmith",
    password: "supersecure",
  };

  jwt = await api.post("/api/login").send(userToLogin);

  for (const blog of helper.initialBlogs) {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${jwt.body.token}`)
      .set("Content-Type", "application/json")
      .send(blog)
      .expect(201);
  }
});

describe("with initial blogs", () => {
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

  describe("viewing a specific blog", async () => {
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];
      blogToView.user = blogToView.user.toString();

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultBlog.body, blogToView);
    });
    test("has id, not _id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(
        resultBlog.body.id !== undefined && resultBlog.body._id === undefined,
        true,
      );
    });
    test("fails with statuscode 404 if blog does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();
      await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
    });
    test("fails with statuscode 400 if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });
  describe("adding a new blog", async () => {
    test("succeeds with a valid blog", async () => {
      const testBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 0,
      };

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${jwt.body.token}`)
        .set("Content-Type", "application/json")
        .send(testBlog)
        .expect(201);

      const getResponse = await api.get("/api/blogs");

      assert.strictEqual(
        getResponse.body.length,
        helper.initialBlogs.length + 1,
      );
      assert.strictEqual(response.body.title, "React patterns");
    });
    test("succeeds even without likes property", async () => {
      const testBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
      };

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${jwt.body.token}`)
        .set("Content-Type", "application/json")
        .send(testBlog)
        .expect(201);

      assert.strictEqual(response.body.likes, 0);
    });
    test("fails with status code 400 if data is invalid", async () => {
      const testBlog = {
        author: "Michael Chan",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${jwt.body.token}`)
        .set("Content-Type", "application/json")
        .send(testBlog)
        .expect(400);
    });
    test("fails with status code 401 if token is not present", async () => {
      const testBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 0,
      };

      await api
        .post("/api/blogs")
        .set("Content-Type", "application/json")
        .send(testBlog)
        .expect(401);
    });
  });
  describe("deleting a single blog", async () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${jwt.body.token}`)
        .expect(204);
    });
    test("fails with statuscode 400 if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set("Authorization", `Bearer ${jwt.body.token}`)
        .expect(400);
    });
  });
  describe("updating a single blog", async () => {
    test("succeeds with a valid id", async () => {
      const initialBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      };
      const updatedBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 12,
      };

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${jwt.body.token}`)
        .set("Content-Type", "application/json")
        .send(initialBlog)
        .expect(201);

      const updatedBlogResponse = await api
        .put(`/api/blogs/${response.body.id}`)
        .set("Authorization", `Bearer ${jwt.body.token}`)
        .set("Content-Type", "application/json")
        .send(updatedBlog)
        .expect(200);

      assert.strictEqual(updatedBlogResponse.body.likes, updatedBlog.likes);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
