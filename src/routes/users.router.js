import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import uploader from "../utils/uploader.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para manejo de usuarios
 */

router.get("/", usersController.getAllUsers);
router.get("/:uid", usersController.getUser);
router.put("/:uid", usersController.updateUser);
router.delete("/:uid", usersController.deleteUser);
// ruta para subir documentos

/**
 * @swagger
 * /api/users/{uid}/documents:
 *   post:
 *     summary: Subir uno o varios documentos para un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Documentos subidos con éxito
 *       404:
 *         description: Usuario no encontrado
 */

router.post(
  "/:uid/documents",
  uploader.array("documents"),
  usersController.uploadDocuments
);

export default router;
