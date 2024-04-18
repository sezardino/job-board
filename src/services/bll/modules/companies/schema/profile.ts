import { fileSchema } from "@/types";
import { z } from "zod";

export const companyProfileRequestSchema = z.object({
  id: z.string().optional(),
});

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
  _count: z.object({
    offers: z.number(),
  }),
});

export type CompanyProfileRequest = z.infer<typeof companyProfileRequestSchema>;

export type CompanyProfileResponse = z.infer<
  typeof companyProfileResponseSchema
>;
