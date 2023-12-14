import { fileSchema } from "@/types";
import { Seniority } from "@prisma/client";
import { z } from "zod";

export const myCompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  catchPhrase: z.string().nullable(),
  thumbnail: fileSchema.nullable(),
  gallery: z.array(fileSchema),
  offers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      level: z.nativeEnum(Seniority),
      salary: z.object({
        from: z.number(),
        to: z.number(),
        currency: z.string(),
      }),
    })
  ),
  _count: z.object({
    offers: z.number(),
    members: z.number(),
  }),
});

export type MyCompanyResponse = z.infer<typeof myCompanyResponseSchema>;
