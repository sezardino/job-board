import { z } from "zod";

export const activeCategoriesRequestSchema = z.object({
  industry: z.string(),
});

export const activeCategoriesResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type ActiveCategoriesRequest = z.infer<
  typeof activeCategoriesRequestSchema
>;

export type ActiveCategoriesResponse = z.infer<
  typeof activeCategoriesResponseSchema
>;
