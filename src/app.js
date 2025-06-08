import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

// importo la seccion de mocking
import mockingRouter from "./routes/mocking.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(`URL DE MONGO`);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
// agrego mocking y manejo de errores pedidos en consigna
app.use("/api", mockingRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Algo salió mal en el servidor",
    code: err.code || 500,
    cause: err.cause || "Error no manejado",
  });
});

app.listen(PORT, () => console.log(`Escuchando en https://localhost:${PORT}`));
