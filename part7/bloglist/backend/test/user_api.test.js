const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  describe("creating user", async () => {
    test("succeeds with a fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "bobsmith",
        name: "Bob Smith",
        password: "supersecure",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });

    test("fails with status code 400 on duplicate usernames", async () => {
      const newUser = {
        username: "bobsmith",
        name: "Bob Smith",
        password: "supersecure",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const secondResponse = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      assert.strictEqual(
        secondResponse.body.error,
        "expected `username` to be unique",
      );
    });
    test("fails with status code 400 if username is not given", async () => {
      const newUser = {
        name: "Bob Smith",
        password: "supersecure",
      };
      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
    test("fails with status code 400 if username is less than 3 characters", async () => {
      const newUser = {
        username: "bo",
        name: "Bob Smith",
        password: "supersecure",
      };
      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
    test("fails with status code 400 if password is not given", async () => {
      const newUser = {
        username: "bobsmith",
        name: "Bob Smith",
      };
      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
    test("fails with status code 400 if password is less than 3 characters", async () => {
      const newUser = {
        username: "bobsmith",
        name: "Bob Smith",
        password: "qw",
      };
      await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
