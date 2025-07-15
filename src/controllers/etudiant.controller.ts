import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { createEtudiantSchema } from "../validators/etudiant.validator";

const prisma = new PrismaClient();

// GET all students
export const getAllEtudiants = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string)?.toLowerCase() || "";
  const skip = (page - 1) * limit;

  const searchFilter = {
    OR: [
      {
        nom: {
          contains: search,
        },
      },
      {
        prenom: {
          contains: search,
        },
      },
      {
        niveau: {
          contains: search,
        },
      },
      {
        etablissement: {
          contains: search,
        },
      },
    ],
  };

  try {
    const [etudiants, total] = await Promise.all([
      prisma.etudiant.findMany({
        where: search ? searchFilter : undefined,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.etudiant.count({
        where: search ? searchFilter : undefined,
      }),
    ]);

    res.json({
      data: etudiants,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving students", error: err });
  }
};

// GET one student
export const getEtudiant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const etudiant = await prisma.etudiant.findUnique({
      where: { id: parseInt(id) },
    });
    if (!etudiant) return res.status(404).json({ message: "Not found" });
    res.json(etudiant);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
};

// CREATE student
export const createEtudiant = async (req: Request, res: Response) => {
  try {
    const validatedData = createEtudiantSchema.parse(req.body);
    const documentPath = req.file ? req.file.filename : null;

    const newEtudiant = await prisma.etudiant.create({
      data: {
        ...validatedData,
        documentPath
      }
    });

    res.status(201).json(newEtudiant);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: "Validation failed", errors: err.errors });
    }
    res.status(500).json({ message: "Error creating student", error: err });
  }
};


// UPDATE student
export const updateEtudiant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await prisma.etudiant.update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err });
  }
};
