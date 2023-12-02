import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";

export const adminIndustriesListRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminIndustriesListResponseSchema = z
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

export type AdminIndustriesListRequest = z.infer<
  typeof adminIndustriesListRequestSchema
>;

export type AdminIndustriesListResponse = z.infer<
  typeof adminIndustriesListResponseSchema
>;
