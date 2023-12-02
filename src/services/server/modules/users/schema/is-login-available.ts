import { z } from "zod";

export const isEmailAvailableRequestSchema = z.object({
  email: z
    .string()
    .min(1, "backend-errors.validation.registration.login.min")
    .max(20, "backend-errors.validation.registration.login.max"),
});

export const isEmailAvailableResponseSchema = z.object({
  available: z.boolean(),
});

export type IsEmailAvailableRequest = z.infer<
  typeof isEmailAvailableRequestSchema
>;

export type IsEmailAvailableResponse = z.infer<
  typeof isEmailAvailableResponseSchema
>;
