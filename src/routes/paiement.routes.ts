import { Router } from "express";
import { getAllPaiements, createPaiement, getPaiementsByStatus, getRecettes } from "../controllers/paiement.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);

router.get("/", getAllPaiements);
router.post("/", createPaiement);
router.get("/statut/:status", getPaiementsByStatus);
router.get("/recettes", getRecettes);

export default router;
