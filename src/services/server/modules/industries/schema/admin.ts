import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";

export const adminIndustriesRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminIndustriesResponseSchema = z
  .object({
    industries: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        status: z.string(),
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
