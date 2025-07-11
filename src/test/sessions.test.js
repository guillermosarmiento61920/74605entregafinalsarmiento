import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import mongoose from "mongoose";
import { usersService } from "../services/index.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.dev" });

describe("Sessions - Endpoints de autentticacion", function () {
  this.timeout(20000);

  let testUser = {
    first_name: "nico",
    last_name: "Test",
    email: `nico${Date.now()}@test.com`, //pongo asi para generar unico usuario cada vez
    password: "665",
  };

  let cookie;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    if (usersService.deleteByEmail) {
      await usersService.deleteByEmail(testUser.email);
    }
  });

  after(async () => {
    await mongoose.disconnect();
    console.log("mongo desconectado para Sessions");
  });

  it("POST /api/sessions/register - deberia registrar un usuario", async () => {
    const res = await request(app)
      .post("/api/sessions/register")
      .send(testUser);
    expect([200, 400]).to.include(res.status);
  });

  it("POST /api/sessions/login - debería loguear al usuario", async () => {
    const res = await request(app).post("/api/sessions/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).to.equal(200);
  });

  it("POST /api/sessions/unprotectedLogin debe devolver cookie unprotectedCookie", async () => {
    const res = await request(app).post("/api/sessions/unprotectedLogin").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.status).to.equal(200);
    expect(res.headers["set-cookie"]).to.exist;
    expect(res.headers["set-cookie"][0]).to.include("unprotectedCookie");
    cookie = res.headers["set-cookie"][0].split(";")[0];
  });

  it("GET /api/sessions/unprotectedCurrent debe devolver datos del usuario", async () => {
    const res = await request(app)
      .get("/api/sessions/unprotectedCurrent")
      .set("Cookie", cookie);

    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property("email", testUser.email);
  });
});
