import { Router } from "express";
import { generateFakePets } from "../services/pets.service.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const quantity = parseInt(req.query.q) || 100;
  const pets = generateFakePets(quantity);
  res.json({ status: "success", data: pets });
});

export default router;
