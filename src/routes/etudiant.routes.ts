import { Router } from "express";
import {
  getAllEtudiants,
  getEtudiant,
  createEtudiant,
  updateEtudiant
} from "../controllers/etudiant.controller";
import { authenticate } from "../middlewares/auth.middleware";
import upload from "../config/multer.config";

const router = Router();

router.use(authenticate); // Secure all routes

router.get("/", getAllEtudiants);
router.get("/:id", getEtudiant);
router.post("/", upload.single("document"), createEtudiant);
router.put("/:id", upload.single("document"), updateEtudiant);

export default router;
