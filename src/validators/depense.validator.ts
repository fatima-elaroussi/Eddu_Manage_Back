import { z } from "zod";

export const createDepenseSchema = z.object({
  type: z.string(),
  montant: z.coerce.number(),
  description: z.string().optional()
});
