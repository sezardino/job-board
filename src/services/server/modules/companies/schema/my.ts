import { z } from "zod";

export const myCompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  owner: z.object({
    id: z.string(),
    name: z.string(),
  }),
  members: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  _count: z.object({
    offers: z.number(),
    members: z.number(),
  }),
});

export type MyCompanyResponse = z.infer<typeof myCompanyResponseSchema>;
