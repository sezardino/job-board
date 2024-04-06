import { salaryValidationSchema } from "@/const/zod";
import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import {
  JobContract,
  JobOperatingMode,
  JobType,
  Seniority,
} from "@prisma/client";
import { z } from "zod";

export const offersListRequestSchema = z
  .object({
    seniority: z.array(z.nativeEnum(Seniority)).optional(),
    operating: z.array(z.nativeEnum(JobOperatingMode)).optional(),
    salary: salaryValidationSchema.optional(),
    industry: z.string().optional(),
    category: z.string().optional(),
    type: z.array(z.nativeEnum(JobType)).optional(),
    contract: z.array(z.nativeEnum(JobContract)).optional(),
  })
  .merge(paginatedRequestSchema);

export const offersListResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        seniority: z.nativeEnum(Seniority),
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

export type OffersListRequest = z.infer<typeof offersListRequestSchema>;
export type OffersListResponse = z.infer<typeof offersListResponseSchema>;
