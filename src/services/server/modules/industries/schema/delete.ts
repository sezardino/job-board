import { EntityStatus } from "@prisma/client";
import { z } from "zod";

export const deleteIndustryResponseSchema = z.object({
  industry: z.object({
    id: z.string(),
    name: z.string(),
    status: z.nativeEnum(EntityStatus),
  }),
});

export type DeleteIndustryResponse = z.infer<
  typeof deleteIndustryResponseSchema
>;
