import { z } from "zod";

export const createEtudiantSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  dateNaissance: z.coerce.date(),
  adresse: z.string(),
  niveau: z.string(),
  etablissement: z.string(),
  matieres: z.string(),
  telephone: z.string().min(10),
  email: z.string().email(),
  contactParent: z.string(),
  modePaiement: z.string(),
  remises: z.string().optional()
});
