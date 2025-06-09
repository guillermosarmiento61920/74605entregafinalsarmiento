import { Router } from "express";

const router = Router();

router.get("/loggerTest", (req, res) => {
  req.logger.debug("Este es un log de DEBUG");
  req.logger.http("Este es un log de HTTP");
  req.logger.info("Este es un log de INFO");
  req.logger.warning("Este es un log de WARNING");
  req.logger.error("Este es un log de ERROR");
  req.logger.fatal("Este es un log de FATAL");

  res.send({ status: "success", message: "Logs generados" });
});

export default router;
