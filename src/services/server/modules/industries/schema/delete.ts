import { EntityStatus } from "@prisma/client";
import { z } from "zod";

export const deleteIndustryRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.nativeEnum(EntityStatus),
});

export type DeleteIndustryRequest = z.infer<typeof deleteIndustryRequestSchema>;
