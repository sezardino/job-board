import { z } from "zod";

export const editCompanyRequestSchema = z.object({
  bio: z.string().optional(),
  slogan: z.string().optional(),
  logo: z.any().optional(),
  // TODO: add in next version (gallery)
  // gallery: z.any().optional(),
  // galleryDeleted: z.array(z.string()).optional(),
});

export const editCompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().optional(),
});

export type EditCompanyRequest = z.infer<typeof editCompanyRequestSchema>;
export type EditCompanyResponse = z.infer<typeof editCompanyResponseSchema>;
