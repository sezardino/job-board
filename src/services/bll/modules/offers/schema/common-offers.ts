import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { Seniority } from "@prisma/client";
import { z } from "zod";

export const commonOffersRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const commonOffersResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        seniority: z.nativeEnum(Seniority),
        salaryFrom: z.number().nullable(),
        salaryTo: z.number().nullable(),
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

export type CommonOffersRequest = z.infer<typeof commonOffersRequestSchema>;
export type CommonOffersResponse = z.infer<typeof commonOffersResponseSchema>;
