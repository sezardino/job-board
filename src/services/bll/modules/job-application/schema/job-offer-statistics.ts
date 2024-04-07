import { JobApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const jobOfferApplicationsStatisticsRequestSchema = z.object({
  offerId: z.string({ required_error: "id is required" }),
  search: z.string().optional(),
});

export const jobOfferApplicationsStatisticsResponseSchema = z.object({
  data: z.record(z.nativeEnum(JobApplicationStatus), z.number()),
});

export type JobOfferApplicationsStatisticsRequest = z.infer<
  typeof jobOfferApplicationsStatisticsRequestSchema
>;

export type JobOfferApplicationsStatisticsResponse = z.infer<
  typeof jobOfferApplicationsStatisticsResponseSchema
>;
