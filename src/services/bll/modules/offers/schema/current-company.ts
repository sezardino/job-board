import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { OfferStatus, Seniority } from "@prisma/client";
import { z } from "zod";

export const currentCompanyOffersRequestSchema = z
  .object({
    companyId: z.string().optional(),
    status: z.nativeEnum(OfferStatus).optional(),
    seniority: z.nativeEnum(Seniority).optional(),
  })
  .merge(paginatedRequestSchema);

export const currentCompanyOffersResponseSchema = z
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

export type CurrentCompanyOffersRequest = z.infer<
  typeof currentCompanyOffersRequestSchema
>;
export type CurrentCompanyOffersResponse = z.infer<
  typeof currentCompanyOffersResponseSchema
>;
