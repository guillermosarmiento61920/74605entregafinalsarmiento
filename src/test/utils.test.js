import { expect } from "chai";
import { createHash, passwordValidation } from "../utils/index.js";

describe("Utils - Bcrypt", function () {
  this.timeout(10000);
  const plainPassword = "123456";
  let hashedPassword;

  it("debe hashear la contraseña correctamente (el hash debe ser distinto)", async () => {
    hashedPassword = await createHash(plainPassword);
    expect(hashedPassword).to.not.equal(plainPassword);
  });

  it("debe validar correctamente una contraseña válida", async () => {
    const isValid = await passwordValidation(
      { password: hashedPassword },
      plainPassword
    );
    expect(isValid).to.be.true;
  });

  it("debe fallar si la contraseña hasheada está alterada", async () => {
    const isValid = await passwordValidation(
      { password: hashedPassword + "a" },
      plainPassword
    );
    expect(isValid).to.be.false;
  });
});
