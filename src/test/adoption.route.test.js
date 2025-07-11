import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config({ path: ".env.dev" });

describe("Adoptions Routes - Integración", function () {
  this.timeout(20000);
  let testUserId;
  let testPetId;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // crear usuario
    const userRes = await request(app)
      .post("/api/sessions/register")
      .send({
        first_name: "Adopt",
        last_name: "Tester",
        email: `adopt${Date.now()}@test.com`,
        password: "1234",
      });

    testUserId =
      userRes.body.payload ||
      (await request(app).get("/api/users")).body.payload.find(
        (u) => u.email === userRes.password
      )._id;

    // crear mascota
    const petRes = await request(app).post("/api/pets").send({
      name: "Perrito",
      specie: "Perro",
      birthDate: "2019-01-01",
    });

    testPetId = petRes.body.payload._id;
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("POST /api/adoptions/:uid/:pid - debería adoptar una mascota", async () => {
    const res = await request(app).post(
      `/api/adoptions/${testUserId}/${testPetId}`
    );
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Pet adopted");
  });

  it("GET /api/adoptions - debería retornar todas las adopciones", async () => {
    const res = await request(app).get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
  });

  it("GET /api/adoptions/:aid - deberia retornar una adopcion especifica", async () => {
    const adoptions = await request(app).get("/api/adoptions");
    const adoptionId = adoptions.body.payload[0]?._id;

    if (adoptionId) {
      const res = await request(app).get(`/api/adoptions/${adoptionId}`);
      expect(res.status).to.equal(200);
      expect(res.body.payload).to.have.property("_id");
    } else {
      console.warn("No hay adopciones disponibles para testear");
    }
  });
});
