import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

// importo la seccion de mocking y logger
import mockingRouter from "./routes/mocking.router.js";
import logger from "./utils/logger.js";
import loggerRouter from "./routes/logger.router.js";

const envFile =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());
app.use(cookieParser());

// middleware para logger de peticiones
app.use((req, res, next) => {
  req.logger = logger;
  logger.http(`${req.method} ${req.url}`);
  next();
});

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
// agrego mocking y manejo de errores pedidos en consigna
app.use("/api", mockingRouter);
app.use((err, req, res, next) => {
  // middleware para manejo de errores
  req.logger.error(err.message);
  res.status(500).json({
    status: "error",
    message: "Algo salió mal en el servidor",
    code: err.code || 500,
    cause: err.cause || "Error no manejado",
  });
});

// ruta de prueba para logger
app.use("/logger", loggerRouter);

app.listen(PORT, () =>
  logger.info(`Servidor escuchando en https://localhost:${PORT}`)
);
