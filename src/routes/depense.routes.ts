import { Router } from "express";
import { getAllDepenses, createDepense, getDepensesByDate } from "../controllers/depense.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);

router.get("/", getAllDepenses);
router.post("/", createDepense);
router.get("/filter", getDepensesByDate);

export default router;
