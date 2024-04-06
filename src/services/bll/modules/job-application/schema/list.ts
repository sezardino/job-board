import { z } from "zod";

export const jobOfferApplicationsRequestSchema = z.object({
  offerId: z.string(),
});

export const jobOfferApplicationsResponseSchema = z.object({});

export type JobOfferApplicationsRequest = z.infer<
  typeof jobOfferApplicationsRequestSchema
>;

export type JobOfferApplicationsResponse = z.infer<
  typeof jobOfferApplicationsResponseSchema
>;
