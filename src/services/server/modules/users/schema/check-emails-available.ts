import { MAX_STRING_LENGTH } from "@/const";
import { z } from "zod";

export const checkEmailsAvailableRequestSchema = z.object({
  emails: z
    .array(
      z
        .string()
        .min(1, "backend-errors.validation.registration.login.min")
        .max(
          MAX_STRING_LENGTH,
          "backend-errors.validation.registration.login.max"
        )
    )
    .max(5),
});

export const checkEmailsAvailableResponseSchema = z.record(
  z.string(),
  z.boolean()
);

export type CheckEmailsAvailableRequest = z.infer<
  typeof checkEmailsAvailableRequestSchema
>;

export type CheckEmailsAvailableResponse = z.infer<
  typeof checkEmailsAvailableResponseSchema
>;
