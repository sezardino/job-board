import { z } from "zod";

export const deleteOfferResponseSchema = z.object({
  success: z.boolean(),
});

export type DeleteOfferResponse = z.infer<typeof deleteOfferResponseSchema>;
