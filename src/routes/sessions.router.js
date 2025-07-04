import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Endpoints para registro de usuario
 */

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */

router.post("/register", sessionsController.register);
router.post("/login", sessionsController.login);
router.get("/current", sessionsController.current);
router.get("/unprotectedLogin", sessionsController.unprotectedLogin);
router.get("/unprotectedCurrent", sessionsController.unprotectedCurrent);

export default router;
