import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/User.dto.js";
// importacion para los errores personalizados
import CustomError from "../utils/customError.js";
import { ERROR_CODES } from "../utils/errorDictionary.js";

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      throw CustomError.createError({
        name: "UserCreationError",
        cause: "Datos incompletos en el cuerpo del request",
        message: ERROR_CODES.USER_CREATION_ERROR.message,
        code: ERROR_CODES.USER_CREATION_ERROR.code,
      });
    }
    const exists = await usersService.getUserByEmail(email);
    if (exists)
      return res
        .status(400)
        .send({ status: "error", error: "User already exists" });
    const hashedPassword = await createHash(password);
    const user = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };
    let result = await usersService.create(user);
    req.logger.info(`Usuario creado: ${email}/n ${result}`);
    res.send({ status: "success", payload: result._id });
  } catch (error) {
    req.logger.error(error.message);
    res.status(500).send({
      status: "error",
      message: error.message,
      code: error.code,
      cause: error.cause,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw CustomError.createError({
      name: "AuthError",
      cause: "Faltan email o password en el request",
      message: ERROR_CODES.AUTH_ERROR.message,
      code: ERROR_CODES.AUTH_ERROR.code,
    });

  const user = await usersService.getUserByEmail(email);
  if (!user)
    throw CustomError.createError({
      name: "AuthError",
      cause: "Usuario no encontrado con ese email",
      message: ERROR_CODES.AUTH_ERROR.message,
      code: ERROR_CODES.AUTH_ERROR.code,
    });

  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword)
    throw CustomError.createError({
      name: "AuthError",
      cause: "Password inválido",
      message: ERROR_CODES.AUTH_ERROR.message,
      code: ERROR_CODES.AUTH_ERROR.code,
    });

  const userToken = UserDTO.getUserTokenFrom(user);
  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res
    .cookie("coderCookie", token, { maxAge: 3600000 })
    .send({ status: "success", message: "Logged in" });
};

const current = async (req, res) => {
  const cookie = req.cookies["coderCookie"];
  const user = jwt.verify(cookie, "tokenSecretJWT");
  if (user) return res.send({ status: "success", payload: user });
};

const unprotectedLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  const user = await usersService.getUserByEmail(email);
  if (!user)
    return res
      .status(404)
      .send({ status: "error", error: "User doesn't exist" });
  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword)
    return res
      .status(400)
      .send({ status: "error", error: "Incorrect password" });
  const token = jwt.sign(user, "tokenSecretJWT", { expiresIn: "1h" });
  res
    .cookie("unprotectedCookie", token, { maxAge: 3600000 })
    .send({ status: "success", message: "Unprotected Logged in" });
};
const unprotectedCurrent = async (req, res) => {
  const cookie = req.cookies["unprotectedCookie"];
  const user = jwt.verify(cookie, "tokenSecretJWT");
  if (user) return res.send({ status: "success", payload: user });
};
export default {
  current,
  login,
  register,
  current,
  unprotectedLogin,
  unprotectedCurrent,
};
