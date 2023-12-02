import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";

export const adminIndustriesListRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminIndustriesListResponseSchema = z
  .object({
    industries: z.array(z.any()),
  })
  .merge(paginatedResponseSchema);

export type AdminIndustriesListRequest = z.infer<
  typeof adminIndustriesListRequestSchema
>;

export type AdminIndustriesListResponse = z.infer<
  typeof adminIndustriesListResponseSchema
>;
