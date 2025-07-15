import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createClasseSchema } from "../validators/classe.validator";

const prisma = new PrismaClient();

export const getAllClasses = async (_req: Request, res: Response) => {
  try {
    const classes = await prisma.classe.findMany({
      include: { enseignant: true,
        etudiants: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving classes", error: err });
  }
};

export const getClasse = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const classe = await prisma.classe.findUnique({
      where: { id },
      include: {
        enseignant: true,
        etudiants: true
      }
    });
    if (!classe) return res.status(404).json({ message: "Not found" });
    res.json(classe);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving class", error: err });
  }
};


export const createClasse = async (req: Request, res: Response) => {
  try {
    const data = createClasseSchema.parse(req.body);
    const newClasse = await prisma.classe.create({ data });
    res.status(201).json(newClasse);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: "Validation error", errors: err.errors });
    }
    res.status(500).json({ message: "Error creating class", error: err });
  }
};

export const updateClasse = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const data = createClasseSchema.parse(req.body);
    const updated = await prisma.classe.update({
      where: { id },
      data
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating class", error: err });
  }
};

export const assignStudentToClass = async (req: Request, res: Response) => {
  const classId = parseInt(req.params.classId);
  const studentId = parseInt(req.body.studentId);

  try {
    await prisma.classe.update({
      where: { id: classId },
      data: {
        etudiants: {
          connect: { id: studentId }
        }
      }
    });
    res.json({ message: "Student assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error assigning student", error: err });
  }
};

export const removeStudentFromClass = async (req: Request, res: Response) => {
  const classId = parseInt(req.params.classId);
  const studentId = parseInt(req.params.studentId);

  try {
    await prisma.classe.update({
      where: { id: classId },
      data: {
        etudiants: {
          disconnect: { id: studentId }
        }
      }
    });
    res.json({ message: "Student removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error removing student", error: err });
  }
};
