import { z } from "zod";

export const deleteJobOfferResponseSchema = z.object({
  success: z.boolean(),
});

export type DeleteJobOfferResponse = z.infer<
  typeof deleteJobOfferResponseSchema
>;
