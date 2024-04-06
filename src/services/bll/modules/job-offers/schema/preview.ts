import { fileSchema } from "@/types";
import {
  JobContract,
  JobOfferStatus,
  JobOperatingMode,
  JobType,
  Seniority,
  SkillLevel,
} from "@prisma/client";
import { z } from "zod";

export const previewJobOfferRequestSchema = z
  .object({
    isPreview: z.coerce.boolean().optional(),
  })
  .optional();

export const previewJobOfferResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.nativeEnum(JobOfferStatus),
  type: z.nativeEnum(JobType),
  contract: z.array(z.nativeEnum(JobContract)),
  operating: z.array(z.nativeEnum(JobOperatingMode)),
  seniority: z.nativeEnum(Seniority),
  salaryFrom: z.number().nullable(),
  salaryTo: z.number().nullable(),
  skills: z.array(
    z.object({ name: z.string(), level: z.nativeEnum(SkillLevel) })
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
  // deadlineAt: z.date().or(z.string()),
});

export type PreviewJobOfferRequest = z.infer<
  typeof previewJobOfferRequestSchema
>;

export type PreviewJobOfferResponse = z.infer<
  typeof previewJobOfferResponseSchema
>;
