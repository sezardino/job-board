import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { EntityStatus } from "@prisma/client";
import { z } from "zod";

export const adminCategoriesRequestSchema = z
  .object({
    industryId: z.string(),
  })
  .merge(paginatedRequestSchema);

export const adminCategoriesResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        status: z.nativeEnum(EntityStatus),
        _count: z.object({
          offers: z.number(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type AdminCategoriesRequest = z.infer<
  typeof adminCategoriesRequestSchema
>;

export type AdminCategoriesResponse = z.infer<
  typeof adminCategoriesResponseSchema
>;
