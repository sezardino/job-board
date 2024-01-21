import { MAX_STRING_LENGTH } from "@/const";
import { z } from "zod";

export const customerRegistrationRequestSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .max(MAX_STRING_LENGTH, "max name length"),
  email: z
    .string({ required_error: "email is required" })
    .email("invalid email")
    .max(MAX_STRING_LENGTH, "max email length"),
  password: z
    .string()
    .min(6, "min password length")
    .max(MAX_STRING_LENGTH, "max password length"),
});

export const customerRegistrationResponseSchema = z.object({});

export type CustomerRegistrationRequest = z.infer<
  typeof customerRegistrationRequestSchema
>;
export type CustomerRegistrationResponse = z.infer<
  typeof customerRegistrationResponseSchema
>;
