import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";

export const adminCompaniesListRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminCompaniesListResponseSchema = z
  .object({
    companies: z.array(z.any()),
  })
  .merge(paginatedResponseSchema);

export type AdminCompaniesListRequest = z.infer<
  typeof adminCompaniesListRequestSchema
>;

export type AdminCompaniesListResponse = z.infer<
  typeof adminCompaniesListResponseSchema
>;
