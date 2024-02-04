import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import {
  JobContract,
  JobOfferStatus,
  JobOperatingMode,
  JobType,
  Seniority,
} from "@prisma/client";
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
        seniority: z.nativeEnum(Seniority),
        salary: z.object({ from: z.number(), to: z.number() }),
        createdAt: z.date().or(z.string()),
        skills: z.array(z.object({ name: z.string() })),
        status: z.nativeEnum(JobOfferStatus),
        contract: z.nativeEnum(JobContract),
        category: z.object({ name: z.string() }),
        industry: z.object({ name: z.string() }),
        deadlineAt: z.date().or(z.string()),
        operating: z.nativeEnum(JobOperatingMode),
        type: z.nativeEnum(JobType),
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
