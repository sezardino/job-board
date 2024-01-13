import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { Seniority } from "@prisma/client";
import { z } from "zod";

export const offersListRequestSchema = z
  .object({
    industry: z.string(),
    category: z.string().optional(),
  })
  .merge(paginatedRequestSchema);

export const offersListResponseSchema = z
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

export type OffersListRequest = z.infer<typeof offersListRequestSchema>;
export type OffersListResponse = z.infer<typeof offersListResponseSchema>;
