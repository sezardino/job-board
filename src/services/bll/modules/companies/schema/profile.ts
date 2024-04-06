import { fileSchema } from "@/types";
import { Seniority } from "@prisma/client";
import { z } from "zod";

export const companyProfileResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  slogan: z.string().nullable(),
  logo: fileSchema.nullable(),
  // TODO: add in next version (gallery)
  // gallery: z.array(fileSchema),
  // TODO: add in next version (thumbnail)
  // thumbnail: fileSchema.nullable(),
  offers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      seniority: z.nativeEnum(Seniority),
      company: z.object({
        id: z.string(),
        name: z.string(),
        logo: fileSchema.nullable(),
      }),
      salaryFrom: z.number().nullable(),
      salaryTo: z.number().nullable(),
      skills: z.array(z.object({ name: z.string() })),
      createdAt: z.date().or(z.string()),
    })
  ),
  _count: z.object({
    offers: z.number(),
  }),
});

export type CompanyProfileResponse = z.infer<
  typeof companyProfileResponseSchema
>;
