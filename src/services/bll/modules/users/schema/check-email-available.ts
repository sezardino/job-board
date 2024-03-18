import { z } from "zod";

const emailSchema = z
  .string()
  .min(1, "backend-errors.validation.registration.login.min")
  .max(255, "backend-errors.validation.registration.login.max");

export const checkEmailAvailableRequestSchema = z
  .object({ email: emailSchema })
  .or(z.object({ emails: z.array(emailSchema) }));

export const checkEmailAvailableResponseSchema = z
  .object({ available: z.boolean() })
  .or(z.record(z.string(), z.boolean()));

export type CheckEmailAvailableRequest = z.infer<
  typeof checkEmailAvailableRequestSchema
>;

export type CheckEmailAvailableResponse = z.infer<
  typeof checkEmailAvailableResponseSchema
>;
