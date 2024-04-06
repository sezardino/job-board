import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { JobOfferStatus, Seniority } from "@prisma/client";
import { z } from "zod";

export const currentCompanyJobOffersRequestSchema = z
  .object({
    status: z.nativeEnum(JobOfferStatus).optional(),
    seniority: z.nativeEnum(Seniority).optional(),
  })
  .merge(paginatedRequestSchema);

export const currentCompanyJobOffersResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        industry: z.object({ id: z.string(), name: z.string() }),
        category: z.object({ id: z.string(), name: z.string() }),
        seniority: z.nativeEnum(Seniority),
        status: z.nativeEnum(JobOfferStatus),
        // deadlineAt: z.date().or(z.string()).nullable(),
        _count: z.object({
          applications: z.number(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type CurrentCompanyJobOffersRequest = z.infer<
  typeof currentCompanyJobOffersRequestSchema
>;
export type CurrentCompanyJobOffersResponse = z.infer<
  typeof currentCompanyJobOffersResponseSchema
>;
