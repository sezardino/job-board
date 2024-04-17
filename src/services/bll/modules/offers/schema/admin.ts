import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { OfferStatus, Seniority } from "@prisma/client";
import { z } from "zod";

export const adminOffersRequestSchema = z
  .object({
    industryId: z.string(),
    categoryId: z.string().optional(),
    status: z.nativeEnum(OfferStatus).optional(),
    seniority: z.nativeEnum(Seniority).optional(),
  })
  .merge(paginatedRequestSchema);

export const adminOffersResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        seniority: z.nativeEnum(Seniority),
        status: z.nativeEnum(OfferStatus),
        _count: z.object({
          applications: z.number(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type AdminOffersRequest = z.infer<typeof adminOffersRequestSchema>;

export type AdminOffersResponse = z.infer<typeof adminOffersResponseSchema>;
