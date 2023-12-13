import {
  fileSchema,
  paginatedRequestSchema,
  paginatedResponseSchema,
} from "@/types";
import { z } from "zod";

export const adminCompaniesRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminCompaniesResponseSchema = z
  .object({
    companies: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        owner: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
          avatar: fileSchema.nullable(),
        }),
        status: z.string(),
        _count: z.object({
          offers: z.number(),
          members: z.number(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type AdminCompaniesRequest = z.infer<typeof adminCompaniesRequestSchema>;

export type AdminCompaniesResponse = z.infer<
  typeof adminCompaniesResponseSchema
>;
