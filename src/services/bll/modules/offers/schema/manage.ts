import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { OfferStatus, Seniority } from "@prisma/client";
import { z } from "zod";

export const offersForManageRequestSchema = z
  .object({
    companyId: z.string().optional(),
    status: z.nativeEnum(OfferStatus).optional(),
    seniority: z.nativeEnum(Seniority).optional(),
    categoryId: z.string().optional(),
    industryId: z.string().optional(),
  })
  .merge(paginatedRequestSchema);

export const offersForManageResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        industry: z.object({ id: z.string(), name: z.string() }),
        category: z.object({ id: z.string(), name: z.string() }),
        seniority: z.nativeEnum(Seniority),
        status: z.nativeEnum(OfferStatus),
        // deadlineAt: z.date().or(z.string()).nullable(),
        _count: z.object({
          applications: z.number(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type OffersForManageRequest = z.infer<
  typeof offersForManageRequestSchema
>;
export type OffersForManageResponse = z.infer<
  typeof offersForManageResponseSchema
>;
