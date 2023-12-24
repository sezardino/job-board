import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { JobOfferStatus } from "@prisma/client";
import { z } from "zod";

export const companyOffersRequestSchema = z
  .object({
    status: z.nativeEnum(JobOfferStatus).optional(),
  })
  .merge(paginatedRequestSchema);

export const companyOffersResponseSchema = z
  .object({
    offers: z.array(z.object({})),
  })
  .merge(paginatedResponseSchema);

export type CompanyOffersRequest = z.infer<typeof companyOffersRequestSchema>;
export type CompanyOffersResponse = z.infer<typeof companyOffersResponseSchema>;
