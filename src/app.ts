import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import etudiantRoutes from "./routes/etudiant.routes";
import { authenticate } from "./middlewares/auth.middleware";
import enseignantRoutes from "./routes/enseignant.routes";
import classeRoutes from "./routes/classe.routes";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/etudiants", etudiantRoutes);
app.use("/api/enseignants", enseignantRoutes);
app.use("/api/classes", classeRoutes);

export default app;
