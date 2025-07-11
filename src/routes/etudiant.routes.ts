import { Router } from "express";
import {
  getAllEtudiants,
  getEtudiant,
  createEtudiant,
  updateEtudiant
} from "../controllers/etudiant.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate); // Secure all routes

router.get("/", getAllEtudiants);
router.get("/:id", getEtudiant);
router.post("/", createEtudiant);
router.put("/:id", updateEtudiant);

export default router;
