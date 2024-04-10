import { OfferStatus } from "@prisma/client";
import { z } from "zod";

export const changeOfferStatusRequestSchema = z.object({
  status: z.nativeEnum(OfferStatus),
});

export type ChangeOfferStatusRequest = z.infer<
  typeof changeOfferStatusRequestSchema
>;

export const changeOfferStatusResponseSchema = z.object({
  success: z.boolean(),
});

export type ChangeOfferStatusResponse = z.infer<
  typeof changeOfferStatusResponseSchema
>;
