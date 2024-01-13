import { z } from "zod";

export const paginatedRequestSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export const paginatedResponseSchema = z.object({
  meta: z.object({
    count: z.number(),
    limit: z.number(),
    page: z.number(),
    totalPages: z.number(),
  }),
});

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
});

export type FileEntity = z.infer<typeof fileSchema>;

export type PaginatedRequest = z.infer<typeof paginatedRequestSchema>;
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;
