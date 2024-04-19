import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";

export const applicationHistoryRequestSchema = z
  .object({
    customerId: z.string().optional(),
  })
  .merge(paginatedRequestSchema);

export const applicationHistoryResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        createdAt: z.string(),
        offer: z.object({
          id: z.string(),
          name: z.string(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type ApplicationHistoryRequest = z.infer<
  typeof applicationHistoryRequestSchema
>;

export type ApplicationHistoryResponse = z.infer<
  typeof applicationHistoryResponseSchema
>;
