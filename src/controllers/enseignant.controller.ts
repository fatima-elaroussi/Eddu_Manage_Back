import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createEnseignantSchema } from "../validators/enseignant.validator";

const prisma = new PrismaClient();

export const getAllEnseignants = async (_req: Request, res: Response) => {
  try {
    const enseignants = await prisma.enseignant.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(enseignants);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving teachers", error: err });
  }
};

export const getEnseignant = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const enseignant = await prisma.enseignant.findUnique({
      where: { id }
    });
    if (!enseignant) return res.status(404).json({ message: "Not found" });
    res.json(enseignant);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
};

export const createEnseignant = async (req: Request, res: Response) => {
  try {
    const data = createEnseignantSchema.parse(req.body);
    const newEnseignant = await prisma.enseignant.create({ data });
    res.status(201).json(newEnseignant);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: "Validation failed", errors: err.errors });
    }
    res.status(500).json({ message: "Error creating teacher", error: err });
  }
};

export const updateEnseignant = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const data = createEnseignantSchema.parse(req.body);
    const updated = await prisma.enseignant.update({
      where: { id },
      data
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating teacher", error: err });
  }
};
