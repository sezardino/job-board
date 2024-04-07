import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const offerApplicationsStatisticsRequestSchema = z.object({
  offerId: z.string({ required_error: "id is required" }),
  search: z.string().optional(),
});

export const offerApplicationsStatisticsResponseSchema = z.object({
  data: z.record(z.nativeEnum(ApplicationStatus), z.number()),
});

export type OfferApplicationsStatisticsRequest = z.infer<
  typeof offerApplicationsStatisticsRequestSchema
>;

export type OfferApplicationsStatisticsResponse = z.infer<
  typeof offerApplicationsStatisticsResponseSchema
>;
