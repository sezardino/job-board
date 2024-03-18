import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { EntityStatus } from "@prisma/client";
import { z } from "zod";

export const adminIndustriesRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminIndustriesResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        status: z.nativeEnum(EntityStatus),
        _count: z.object({
          categories: z.number(),
          offers: z.number(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type AdminIndustriesRequest = z.infer<
  typeof adminIndustriesRequestSchema
>;

export type AdminIndustriesResponse = z.infer<
  typeof adminIndustriesResponseSchema
>;
