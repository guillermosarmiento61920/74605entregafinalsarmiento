//archivo traido de lo del profe

import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("User Routes - Integracion", () => {
  it("GET /api/users esperamos un Listado de Usuarios con codigo 200", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("GET /api/users/:id esperamos que retorne un Usuario en formato Objeto", async () => {
    const res = await request(app).get("/api/users/1");
    expect(res.status).to.be.oneOf([200, 404]); // 200 si existe y 404 si no existe
    if (res.status === 200) {
      expect(res.body).to.have.property("id");
    }
  });

  it("POST /api/users esperamos la creacion de un Usuario", async () => {
    const newUser = {
      email: "tester@user.com",
      password: "123456",
      username: "testers",
    };

    const res = await request(app).post("/api/users").send(newUser);
    expect(res.status).to.equal(201); // 201 -> Created
    expect(res.body).to.include.keys("id", "username", "email");
    expect(res.body.username).to.equal(newUser.username);
    expect(res.body.email).to.equal(newUser.email);
  });

  it("PUT /api/users/:id should update an existing user", async () => {
    const updatedData = {
      username: "nuevoNombre",
      email: "nuevo@email.com",
    };

    const res = await request(app).put("/api/users/1").send(updatedData);
    expect(res.status).to.be.oneOf([200, 404]); // 404 si el ID no existe

    if (res.status === 200) {
      expect(res.body.username).to.equal(updatedData.username);
    }
  });

  it("DELETE /api/users/:id should delete a user", async () => {
    const res = await request(app).delete("/api/users/1");
    expect(res.status).to.be.oneOf([204, 404]); // 204 si lo eliminó, 404 si no lo encontró
  });
});
