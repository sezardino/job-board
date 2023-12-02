import { z } from "zod";

export const registrationRequestSchema = z.object({
  email: z
    .string()
    .min(1, "backend-errors.validation.registration.login.min")
    .max(20, "backend-errors.validation.registration.login.max"),
  password: z
    .string()
    .min(6, "backend-errors.validation.registration.password"),
});

export const registrationResponseSchema = z.object({
  success: z.boolean(),
});

export type RegistrationRequest = z.infer<typeof registrationRequestSchema>;
export type RegistrationResponse = z.infer<typeof registrationResponseSchema>;
