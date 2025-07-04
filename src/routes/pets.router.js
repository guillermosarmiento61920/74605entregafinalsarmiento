import { Router } from "express";
import petsController from "../controllers/pets.controller.js";
import uploader from "../utils/uploader.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Endpoints para revision y registro de mascotas
 */

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Registro nueva mascota
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specie
 *               - birthDate
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mascota registrada
 */

router.get("/", petsController.getAllPets);
router.post("/", petsController.createPet);
router.post(
  "/withimage",
  uploader.single("image"),
  petsController.createPetWithImage
);
router.put("/:pid", petsController.updatePet);
router.delete("/:pid", petsController.deletePet);

export default router;
