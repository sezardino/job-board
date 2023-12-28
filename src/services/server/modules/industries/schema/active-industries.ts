import { z } from "zod";

export const activeIndustriesResponseSchema = z.object({
  industries: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      _count: z.object({
        categories: z.number(),
        offers: z.number(),
      }),
    })
  ),
});

export type ActiveIndustriesResponse = z.infer<
  typeof activeIndustriesResponseSchema
>;
