import { Router } from "express";
import { getDashboardStats, getMonthlyStats } from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);

router.get("/summary", getDashboardStats);
router.get("/monthly", getMonthlyStats);

export default router;
