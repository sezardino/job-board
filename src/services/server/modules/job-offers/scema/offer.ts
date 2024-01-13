import { fileSchema } from "@/types";
import {
  JobContract,
  JobOfferStatus,
  JobOperatingMode,
  JobType,
  Seniority,
} from "@prisma/client";
import { z } from "zod";

export const oneOfferResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.nativeEnum(JobOfferStatus),
  type: z.nativeEnum(JobType),
  contract: z.nativeEnum(JobContract),
  operating: z.nativeEnum(JobOperatingMode),
  level: z.nativeEnum(Seniority),
  salary: z
    .object({
      from: z.number(),
      to: z.number(),
    })
    .nullable(),
  skills: z.array(
    z.object({ name: z.string(), level: z.nativeEnum(Seniority) })
  ),
  company: z.object({
    id: z.string(),
    name: z.string(),
    logo: fileSchema.nullable(),
    slogan: z.string().nullable(),
  }),
  industry: z.object({ name: z.string() }),
  category: z.object({ name: z.string() }),
  publishedAt: z.date().or(z.string()),
  deadlineAt: z.date().or(z.string()),
});

export type OneOfferResponse = z.infer<typeof oneOfferResponseSchema>;
