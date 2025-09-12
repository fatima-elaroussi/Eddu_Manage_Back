import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createInvoice = async (req: Request, res: Response) => {
  const { etudiantId, classeId, matiereId, price } = req.body;

  // Find class to get its percentage and teacher
  const classe = await prisma.classe.findUnique({
    where: { id: classeId },
    select: {
      id: true,
      name: true,
      matieres: true,
      niveau: true,
      horaire: true,
      enseignantId: true,
      createdAt: true,
      percentage: true, // Ensure percentage is selected
    },
  });

  if (!classe) return res.status(404).json({ error: 'Classe not found' });

  const percentage = classe.percentage ?? 100;
  const teacherAmount = price * (percentage / 100);

  const invoice = await prisma.invoice.create({
    data: {
      etudiantId,
      enseignantId: classe.enseignantId,
      matiereId,
      classeId,
      price,
      teacherAmount,
    },
  });

  res.status(201).json(invoice);
};
