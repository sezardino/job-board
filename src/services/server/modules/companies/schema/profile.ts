import { fileSchema } from "@/types";
import { Seniority } from "@prisma/client";
import { z } from "zod";

export const companyProfileResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  slogan: z.string().nullable(),
  thumbnail: fileSchema.nullable(),
  logo: fileSchema.nullable(),
  gallery: z.array(fileSchema),
  offers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      level: z.nativeEnum(Seniority),
      company: z.object({
        id: z.string(),
        name: z.string(),
        logo: fileSchema.nullable(),
      }),
      salary: z.object({
        from: z.number(),
        to: z.number(),
      }),
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
