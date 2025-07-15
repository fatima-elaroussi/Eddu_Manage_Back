import { z } from "zod";

export const createEnseignantSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(10),
  specialites: z.string(),
  niveaux: z.string(),
  disponibilites: z.string(),
  tarifHoraire: z.coerce.number(),
  modePaiement: z.string()
});
