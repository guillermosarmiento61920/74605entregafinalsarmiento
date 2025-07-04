import { Router } from "express";
import adoptionsController from "../controllers/adoptions.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints para registro de adaopciones
 */

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Registrar una nueva adopción
 *     tags:
 *       - Adoptions
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que adopta
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la mascota a adoptar
 *     responses:
 *       200:
 *         description: Mascota adoptada con éxito
 *       404:
 *         description: Usuario o mascota no encontrados
 *       400:
 *         description: Mascota ya adoptada
 */

router.get("/", adoptionsController.getAllAdoptions);
router.get("/:aid", adoptionsController.getAdoption);
router.post("/:uid/:pid", adoptionsController.createAdoption);

export default router;
