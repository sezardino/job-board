import { z } from "zod";

export const checkEmailAvailableRequestSchema = z.object({
  email: z
    .string()
    .min(1, "backend-errors.validation.registration.login.min")
    .max(255, "backend-errors.validation.registration.login.max"),
});

export const checkEmailAvailableResponseSchema = z.object({
  available: z.boolean(),
});

export type CheckEmailAvailableRequest = z.infer<
  typeof checkEmailAvailableRequestSchema
>;

export type CheckEmailAvailableResponse = z.infer<
  typeof checkEmailAvailableResponseSchema
>;
