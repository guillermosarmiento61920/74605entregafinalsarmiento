// src/test/pets.service.test.js
import { expect } from "chai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { petsService } from "../services/index.js";

dotenv.config({ path: ".env.dev" });

describe("Pet Service - Integración", () => {
  let createdPet;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("debería crear una nueva mascota", async () => {
    const newPet = {
      name: "Firulais",
      specie: "Perro",
      birthDate: "2015-01-01",
    };

    createdPet = await petsService.create(newPet);
    expect(createdPet).to.have.property("_id");
    expect(createdPet.name).to.equal(newPet.name);
  });

  it("debería obtener todas las mascotas", async () => {
    const pets = await petsService.getAll();
    expect(pets).to.be.an("array");
    expect(pets.length).to.be.greaterThan(0);
  });

  it("debería actualizar una mascota", async () => {
    const update = { name: "Lassie" };
    const updatedPet = await petsService.update(createdPet._id, update);
    expect(updatedPet).to.be.ok;
  });

  it("debería eliminar una mascota", async () => {
    const result = await petsService.delete(createdPet._id);
    expect(result).to.have.property("_id");
  });
});
