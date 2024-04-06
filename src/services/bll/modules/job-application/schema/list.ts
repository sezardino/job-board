import { JobApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const jobOfferApplicationsRequestSchema = z.object({
  offerId: z.string({ required_error: "id is required" }),
  status: z.nativeEnum(JobApplicationStatus).optional(),
});

export const jobOfferApplicationsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      status: z.nativeEnum(JobApplicationStatus),
      createdAt: z.string(),
    })
  ),
});

export type JobOfferApplicationsRequest = z.infer<
  typeof jobOfferApplicationsRequestSchema
>;

export type JobOfferApplicationsResponse = z.infer<
  typeof jobOfferApplicationsResponseSchema
>;
