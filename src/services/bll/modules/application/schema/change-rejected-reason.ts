import { MAX_STRING_LENGTH } from "@/const";
import { z } from "zod";

export const changeRejectedApplicationReasonRequestSchema = z.object({
  rejectedReason: z.string().max(MAX_STRING_LENGTH),
});

export const changeRejectedApplicationReasonResponseSchema = z.object({
  success: z.boolean(),
});

export type ChangeRejectedApplicationReasonRequest = z.infer<
  typeof changeRejectedApplicationReasonRequestSchema
>;

export type ChangeRejectedApplicationReasonResponse = z.infer<
  typeof changeRejectedApplicationReasonResponseSchema
>;
