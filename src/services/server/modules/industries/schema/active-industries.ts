import { z } from "zod";

export const activeIndustriesResponseSchema = z.object({
  industries: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type ActiveIndustriesResponse = z.infer<
  typeof activeIndustriesResponseSchema
>;
