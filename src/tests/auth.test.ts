import request from "supertest";
import { app } from "../app";
import { redis } from "../config/redis";

describe("Authentication API", () => {
  const user = {
    username: "chuks",
    password: "StrongP@ssword123!"
  };

  // Clean up before each test
  beforeEach(async () => {
    await redis.del(`user:${user.username}`);
  });

  // Clean up after all tests
  afterAll(async () => {
    await redis.del(`user:${user.username}`);
    await redis.quit();
  });

  it("creates a user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(user);

    expect(res.status).toBe(201);
  });

  it("authenticates user", async () => {
    await request(app).post("/auth/register").send(user);
    
    const res = await request(app)
      .post("/auth/login")
      .send(user);

    expect(res.status).toBe(200);
  });

  it("rejects invalid credentials", async () => {
    await request(app).post("/auth/register").send(user);
    
    const res = await request(app)
      .post("/auth/login")
      .send({ 
        username: user.username, 
        password: "DifferentP@ss123!"
      });

    expect(res.status).toBe(401);
  });
});