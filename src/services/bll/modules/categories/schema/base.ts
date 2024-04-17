import { paginatedResponseSchema } from "@/types";
import { EntityStatus } from "@prisma/client";
import { z } from "zod";

export const baseCategoryDataResponseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    status: z.nativeEnum(EntityStatus),
  })
  .merge(paginatedResponseSchema);

export type BaseCategoryDataResponse = z.infer<
  typeof baseCategoryDataResponseSchema
>;
