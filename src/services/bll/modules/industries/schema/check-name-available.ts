import { SLUG_REGEXP } from "@/const/regexp";
import { z } from "zod";

export const checkIndustryNameAvailableRequestSchema = z.object({
  name: z.string().regex(SLUG_REGEXP).min(1).max(20),
});

export const checkIndustryNameAvailableResponseSchema = z.object({
  available: z.boolean(),
});

export type CheckIndustryNameAvailableRequest = z.infer<
  typeof checkIndustryNameAvailableRequestSchema
>;

export type CheckIndustryNameAvailableResponse = z.infer<
  typeof checkIndustryNameAvailableResponseSchema
>;
