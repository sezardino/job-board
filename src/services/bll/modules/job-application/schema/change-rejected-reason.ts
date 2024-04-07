import { MAX_STRING_LENGTH } from "@/const";
import { z } from "zod";

export const changeRejectedJobApplicationReasonRequestSchema = z.object({
  rejectedReason: z.string().max(MAX_STRING_LENGTH),
});

export const changeRejectedJobApplicationReasonResponseSchema = z.object({
  success: z.boolean(),
});

export type ChangeRejectedJobApplicationReasonRequest = z.infer<
  typeof changeRejectedJobApplicationReasonRequestSchema
>;

export type ChangeRejectedJobApplicationReasonResponse = z.infer<
  typeof changeRejectedJobApplicationReasonResponseSchema
>;
