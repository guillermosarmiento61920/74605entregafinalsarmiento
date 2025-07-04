// src/test/pets.route.test.js
import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config({ path: ".env.dev" });

describe("Pets Routes - Integración", () => {
  let createdPetId;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("GET /api/pets - debe devolver un listado de mascotas", async () => {
    const res = await request(app).get("/api/pets");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
  });

  it("POST /api/pets - debe crear una nueva mascota", async () => {
    const newPet = {
      name: "Mishi",
      specie: "Gato",
      birthDate: "2018-06-15",
    };

    const res = await request(app).post("/api/pets").send(newPet);
    expect(res.status).to.equal(200); // tu endpoint devuelve 200, no 201
    expect(res.body.payload).to.have.property("_id");
    createdPetId = res.body.payload._id;
  });

  it("PUT /api/pets/:pid - debe actualizar la mascota", async () => {
    const res = await request(app)
      .put(`/api/pets/${createdPetId}`)
      .send({ name: "Michifus" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("pet updated");
  });

  it("DELETE /api/pets/:pid - debe eliminar la mascota", async () => {
    const res = await request(app).delete(`/api/pets/${createdPetId}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("pet deleted");
  });
});
