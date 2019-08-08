const request = require("supertest");
const app = require("../../src/app");

const { User } = require("../../src/app/models");

const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User", {
      password: "12sw345"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "12sw345"
      });

    expect(response.status).toBe(200);
  });

  it("should not authenticated with invalid credentials", async () => {
    const user = await factory.create("User", {
      password: "12sw345"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "12sw3232"
      });

    expect(response.status).toBe(401);
  });

  it("should return jwt token when authenticated", async () => {
    const user = await factory.create("User", {
      password: "12sw345"
    });

    const response = await request(app)
      .post("/sessions")
      .send({
        email: user.email,
        password: "12sw345"
      });

    expect(response.body).toHaveProperty("token");
  });

  it("should be able to access private routes when authenticated", async () => {
    const user = await factory.create("User", {
      password: "12sw345"
    });

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it("should not be able to access private routes without jwt token", async () => {
    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it("should not be able to access private routes with invalid jwt token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 12sw225`);

    expect(response.status).toBe(401);
  });

  // it("should sum two numbers", async () => {
  //   const user = await User.create({
  //     name: "Luan",
  //     email: "bugvoid404@gmail.com",
  //     password_hash: "12sd479"
  //   });
  //   console.log(user);
  //   expect(user.email).toBe("bugvoid404@gmail.com");
  // });
  //A rota /authentication deve retornar um token JWT quando for chamada com  credenciais validas
  // Should receive JWT token when authenticated with valid credentials
  // const x = 2;
  // const y = 4;
  // const sum = x + y;
  // expect(sum).toBe(7);
});
