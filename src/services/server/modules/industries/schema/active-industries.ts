import { z } from "zod";

export const activeIndustriesResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type ActiveIndustriesResponse = z.infer<
  typeof activeIndustriesResponseSchema
>;
