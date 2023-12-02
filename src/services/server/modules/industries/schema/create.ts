import { z } from "zod";

export const createIndustryRequestSchema = z.object({
  name: z.string().min(3).max(255),
});

export const createIndustryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
});

export type CreateIndustryRequest = z.infer<typeof createIndustryRequestSchema>;
export type CreateIndustryResponse = z.infer<
  typeof createIndustryResponseSchema
>;
