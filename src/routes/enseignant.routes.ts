import { Router } from "express";
import {
  getAllEnseignants,
  getEnseignant,
  createEnseignant,
  updateEnseignant
} from "../controllers/enseignant.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate); // Protect routes

router.get("/", getAllEnseignants);
router.get("/:id", getEnseignant);
router.post("/", createEnseignant);
router.put("/:id", updateEnseignant);

export default router;
