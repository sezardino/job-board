import { z } from "zod";

export const checkCompanyNameAvailableRequestSchema = z.object({
  name: z.string({ required_error: "name is required" }),
});

export const checkCompanyNameAvailableResponseSchema = z.object({
  available: z.boolean(),
});

export type CheckCompanyNameAvailableRequest = z.infer<
  typeof checkCompanyNameAvailableRequestSchema
>;

export type CheckCompanyNameAvailableResponse = z.infer<
  typeof checkCompanyNameAvailableResponseSchema
>;
