import { fileSchema } from "@/types";
import { z } from "zod";

export const myCompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  thumbnail: fileSchema.nullable(),
  gallery: z.array(fileSchema),
  owner: z.object({
    id: z.string(),
    name: z.string(),
    avatar: fileSchema.nullable(),
  }),
  members: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      avatar: fileSchema.nullable(),
    })
  ),
  _count: z.object({
    offers: z.number(),
    members: z.number(),
  }),
});

export type MyCompanyResponse = z.infer<typeof myCompanyResponseSchema>;
