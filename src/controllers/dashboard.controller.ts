import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    // Calculate total income
    const recettes = await prisma.paiement.aggregate({ _sum: { montant: true } });

    // Calculate total expenses
    const depenses = await prisma.depense.aggregate({ _sum: { montant: true } });

    const totalRecettes = recettes._sum.montant || 0;
    const totalDepenses = depenses._sum.montant || 0;
    const profit = totalRecettes - totalDepenses;

    res.json({
      totalRecettes,
      totalDepenses,
      profit
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: err });
  }
};

// Monthly breakdown for charts
export const getMonthlyStats = async (_req: Request, res: Response) => {
  try {
    const paiements = await prisma.$queryRaw`
      SELECT DATE_FORMAT(datePaiement, '%Y-%m') as month, SUM(montant) as total
      FROM Paiement
      GROUP BY month
      ORDER BY month ASC;
    `;

    const depenses = await prisma.$queryRaw`
      SELECT DATE_FORMAT(dateDepense, '%Y-%m') as month, SUM(montant) as total
      FROM Depense
      GROUP BY month
      ORDER BY month ASC;
    `;

    res.json({ paiements, depenses });
  } catch (err) {
    res.status(500).json({ message: "Error fetching monthly stats", error: err });
  }
};
