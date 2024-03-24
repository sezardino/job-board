import { JobOfferStatus } from "@prisma/client";
import { z } from "zod";

export const changeJobOfferStatusRequestSchema = z.object({
  status: z.nativeEnum(JobOfferStatus),
});

export type ChangeJobOfferStatusRequest = z.infer<
  typeof changeJobOfferStatusRequestSchema
>;

export const changeJobOfferStatusResponseSchema = z.object({
  success: z.boolean(),
});

export type ChangeJobOfferStatusResponse = z.infer<
  typeof changeJobOfferStatusResponseSchema
>;
