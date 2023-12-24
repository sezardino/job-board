import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { JobOfferStatus } from "@prisma/client";
import { z } from "zod";

export const myCompanyOffersRequestSchema = z
  .object({
    status: z.nativeEnum(JobOfferStatus).optional(),
  })
  .merge(paginatedRequestSchema);

export const myCompanyOffersResponseSchema = z
  .object({
    offers: z.array(z.object({})),
  })
  .merge(paginatedResponseSchema);

export type MyCompanyOffersRequest = z.infer<
  typeof myCompanyOffersRequestSchema
>;
export type MyCompanyOffersResponse = z.infer<
  typeof myCompanyOffersResponseSchema
>;
