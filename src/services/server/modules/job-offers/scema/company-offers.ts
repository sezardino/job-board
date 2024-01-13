import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { JobOfferStatus, Seniority } from "@prisma/client";
import { z } from "zod";

export const companyOffersRequestSchema = z
  .object({
    status: z.nativeEnum(JobOfferStatus).optional(),
  })
  .merge(paginatedRequestSchema);

export const companyOffersResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        level: z.nativeEnum(Seniority),
        salary: z.object({ from: z.number(), to: z.number() }),
        createdAt: z.date().or(z.string()),
        skills: z.array(z.object({ name: z.string() })),
        company: z.object({
          id: z.string(),
          name: z.string(),
          logo: z
            .object({ id: z.string(), url: z.string(), name: z.string() })
            .nullable(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type CompanyOffersRequest = z.infer<typeof companyOffersRequestSchema>;
export type CompanyOffersResponse = z.infer<typeof companyOffersResponseSchema>;
