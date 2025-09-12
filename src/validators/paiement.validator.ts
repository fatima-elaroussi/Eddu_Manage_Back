import { z } from "zod";

export const createPaiementSchema = z.object({
  etudiantId: z.coerce.number(),
  montant: z.coerce.number(),
  mode: z.string(),
  statut: z.enum(["complet", "incomplet", "non payé"])
});
