import { z } from "zod";
import { StatisticChange, StatisticPeriod } from "./be";

export const statisticsRequestSchema = z.object({
  period: z.nativeEnum(StatisticPeriod).optional(),
});

export const statisticsResponseSchema = z.object({
  currentPeriod: z.number(),
  prevPeriod: z.number(),
  statistics: z.number(),
  type: z.nativeEnum(StatisticChange),
});

export const paginatedRequestSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export const paginatedResponseSchema = z.object({
  meta: z.object({
    count: z.coerce.number(),
    limit: z.coerce.number(),
    page: z.coerce.number(),
    totalPages: z.coerce.number(),
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

export type StatisticsRequest = z.infer<typeof statisticsRequestSchema>;

export type StatisticsResponse = z.infer<typeof statisticsResponseSchema>;
