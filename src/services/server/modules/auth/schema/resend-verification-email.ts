import { z } from "zod";

export enum ResendVerificationEmailStatus {
  Success = "success",
  NotFound = "not-found",
  AlreadyVerified = "already-verified",
}

export const resendVerificationEmailRequestSchema = z.object({
  email: z.string({ required_error: "email required" }).email("email invalid"),
});

export const resendVerificationEmailResponseSchema = z.object({
  status: z.nativeEnum(ResendVerificationEmailStatus),
});

export type ResendVerificationEmailRequest = z.infer<
  typeof resendVerificationEmailRequestSchema
>;

export type ResendVerificationEmailResponse = z.infer<
  typeof resendVerificationEmailResponseSchema
>;
