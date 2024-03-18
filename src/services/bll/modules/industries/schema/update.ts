import { EntityStatus } from "@prisma/client";
import { z } from "zod";

export const updateIndustryRequestSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(EntityStatus),
});

export const updateIndustryResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.nativeEnum(EntityStatus),
});

export type UpdateIndustryRequest = z.infer<typeof updateIndustryRequestSchema>;
export type UpdateIndustryResponse = z.infer<
  typeof updateIndustryResponseSchema
>;
