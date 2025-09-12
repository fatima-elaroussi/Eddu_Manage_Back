import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createDepenseSchema } from "../validators/depense.validator";

const prisma = new PrismaClient();

// List all expenses
export const getAllDepenses = async (_req: Request, res: Response) => {
  try {
    const depenses = await prisma.depense.findMany({
      orderBy: { dateDepense: "desc" }
    });
    res.json(depenses);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving expenses", error: err });
  }
};

// Add new expense
export const createDepense = async (req: Request, res: Response) => {
  try {
    const data = createDepenseSchema.parse(req.body);
    const depense = await prisma.depense.create({ data });
    res.status(201).json(depense);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ message: "Validation error", errors: err.errors });
    }
    res.status(500).json({ message: "Error creating expense", error: err });
  }
};

// Filter expenses by date range
export const getDepensesByDate = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;
  try {
    const depenses = await prisma.depense.findMany({
      where: {
        dateDepense: {
          gte: startDate ? new Date(startDate as string) : undefined,
          lte: endDate ? new Date(endDate as string) : undefined
        }
      },
      orderBy: { dateDepense: "desc" }
    });
    res.json(depenses);
  } catch (err) {
    res.status(500).json({ message: "Error filtering expenses", error: err });
  }
};
