import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const offerApplicationsRequestSchema = z.object({
  offerId: z.string({ required_error: "id is required" }),
  status: z.nativeEnum(ApplicationStatus),
  search: z.string().optional(),
});

export const offerApplicationsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.string(),
      _count: z.object({
        notes: z.number(),
      }),
    })
  ),
});

export type OfferApplicationsRequest = z.infer<
  typeof offerApplicationsRequestSchema
>;

export type OfferApplicationsResponse = z.infer<
  typeof offerApplicationsResponseSchema
>;
