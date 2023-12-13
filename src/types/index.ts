import { NextResponse } from "next/server";
import { ZodIssue, z } from "zod";

// temp
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

export type PaginatedRequest = z.infer<typeof paginatedRequestSchema>;
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;

export type BackendErrorResponse = NextResponse<{
  message: string;
  errors?: ZodIssue[];
}>;

export type ActionProp<T, R = any> = {
  handler: (args: T) => Promise<R>;
  isLoading: boolean;
};

export type DataProp<T> = {
  data?: T;
  isLoading: boolean;
};
