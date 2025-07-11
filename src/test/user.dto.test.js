import { expect } from "chai";
import UserDTO from "../dto/User.dto.js";

describe("DTO - UserDTO", function () {
  this.timeout(10000);
  it("debería devolver nombre completo y eliminar campos sensibles", () => {
    const user = {
      first_name: "Juan",
      last_name: "Pérez",
      email: "juan@test.com",
      password: "123456",
      role: "user",
    };

    const dto = UserDTO.getUserTokenFrom(user);

    expect(dto).to.have.property("name", "Juan Pérez");
    expect(dto).to.have.property("email", "juan@test.com");
    expect(dto).to.have.property("role", "user");
    expect(dto).to.not.have.property("password");
    expect(dto).to.not.have.property("first_name");
    expect(dto).to.not.have.property("last_name");
  });
});
