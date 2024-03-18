import { EntityStatus } from "@prisma/client";
import { z } from "zod";

export const createIndustryRequestSchema = z.object({
  name: z.string().min(3).max(255),
});

export const createIndustryResponseSchema = z.object({
  industry: z.object({
    id: z.string(),
    name: z.string(),
    status: z.nativeEnum(EntityStatus),
  }),
});

export type CreateIndustryRequest = z.infer<typeof createIndustryRequestSchema>;
export type CreateIndustryResponse = z.infer<
  typeof createIndustryResponseSchema
>;
