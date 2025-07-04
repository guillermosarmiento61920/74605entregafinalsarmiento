import { expect } from "chai";
import { UserService } from "../services/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.dev" });
const secret = process.env.JWT_SECRET;

describe("User Service - integracion", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it("debería registrar un nuevo usuario", async () => {
    const user = {
      first_name: "Test",
      last_name: "User",
      email: "testuser@email.com",
      password: "123456",
    };

    createdUser = await usersService.create(user);

    expect(createdUser).to.have.property("_id");
    expect(createdUser.email).to.equal(user.email);
  });

  it("debería obtener un usuario por ID", async () => {
    const user = await usersService.getUserById(createdUser._id);
    expect(user).to.have.property("email", createdUser.email);
  });

  it("debería eliminar un usuario", async () => {
    const result = await usersService.delete(createdUser._id);
    expect(result).to.have.property("_id");
  });
});
