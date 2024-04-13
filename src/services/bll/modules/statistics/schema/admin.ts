import { statisticsRequestSchema, statisticsResponseSchema } from "@/types";
import { z } from "zod";

export const adminStatisticsRequestSchema = z
  .object({})
  .merge(statisticsRequestSchema);

export const adminStatisticsResponseSchema = z.object({
  users: statisticsResponseSchema,
  companies: statisticsResponseSchema,
  offers: statisticsResponseSchema,
  applications: statisticsResponseSchema,
});

export type AdminStatisticsRequest = z.infer<
  typeof adminStatisticsRequestSchema
>;

export type AdminStatisticsResponse = z.infer<
  typeof adminStatisticsResponseSchema
>;
