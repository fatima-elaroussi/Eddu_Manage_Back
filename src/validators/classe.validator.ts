import { z } from "zod";

export const createClasseSchema = z.object({
  name: z.string().min(3),
  matiere: z.string(),
  niveau: z.string(),
  horaire: z.string(),
  enseignantId: z.coerce.number()
});

export const updateClasseSchema = z.object({
  name: z.string().min(3).optional(),
  matiere: z.string().optional(),
  niveau: z.string().optional(),
  horaire: z.string().optional(),
  enseignantId: z.coerce.number().optional()
});