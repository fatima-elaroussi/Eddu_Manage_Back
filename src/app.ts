import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import etudiantRoutes from "./routes/etudiant.routes";
import { authenticate } from "./middlewares/auth.middleware";
import enseignantRoutes from "./routes/enseignant.routes";
import classeRoutes from "./routes/classe.routes";
import paiementRoutes from "./routes/paiement.routes";
import depenseRoutes from "./routes/depense.routes";
import dashboardRoutes from "./routes/dashboard.routes";

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
app.use("/api/paiements", paiementRoutes);
app.use("/api/depenses", depenseRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;
