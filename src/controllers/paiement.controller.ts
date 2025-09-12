import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createPaiementSchema } from "../validators/paiement.validator";

const prisma = new PrismaClient();

export const getAllPaiements = async (_req: Request, res: Response) => {
  try {
    const paiements = await prisma.paiement.findMany({
      include: { etudiant: true },
      orderBy: { datePaiement: "desc" }
    });
    res.json(paiements);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving payments", error: err });
  }
};

export const createPaiement = async (req: Request, res: Response) => {
  try {
    const data = createPaiementSchema.parse(req.body);
    const paiement = await prisma.paiement.create({ data });
    res.status(201).json(paiement);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: "Validation failed", errors: err.errors });
    }
    res.status(500).json({ message: "Error creating payment", error: err });
  }
};

export const getPaiementsByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;
  try {
    const paiements = await prisma.paiement.findMany({
      where: { statut: status },
      include: { etudiant: true }
    });
    res.json(paiements);
  } catch (err) {
    res.status(500).json({ message: "Error filtering payments", error: err });
  }
};

export const getRecettes = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  try {
    const recettes = await prisma.paiement.aggregate({
      _sum: { montant: true },
      where: {
        datePaiement: {
          gte: startDate ? new Date(startDate as string) : undefined,
          lte: endDate ? new Date(endDate as string) : undefined
        }
      }
    });
    res.json({ totalRecettes: recettes._sum.montant || 0 });
  } catch (err) {
    res.status(500).json({ message: "Error calculating income", error: err });
  }
};
