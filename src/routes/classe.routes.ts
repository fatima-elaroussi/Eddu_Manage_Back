import { Router } from "express";
import {
  getAllClasses,
  getClasse,
  createClasse,
  updateClasse,
  assignStudentToClass,
  removeStudentFromClass
} from "../controllers/classe.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/", getAllClasses);
router.get("/:id", getClasse);
router.post("/", createClasse);
router.put("/:id", updateClasse);
router.post("/:classId/assign-student", assignStudentToClass);
router.delete("/:classId/remove-student/:studentId", removeStudentFromClass);

export default router;
