import { z } from "zod";

export enum VerifyResetPasswordTokenErrors {
  TokenExpired = "token-expired",
  TokenInvalid = "token-invalid",
  NotFound = "not-found",
}

export const verifyResetPasswordTokenRequestSchema = z.object({
  token: z.string(),
});

export const verifyResetPasswordTokenResponseSchema = z.object({
  success: z.boolean(),
});

export type VerifyResetPasswordTokenRequest = z.infer<
  typeof verifyResetPasswordTokenRequestSchema
>;
export type VerifyResetPasswordTokenResponse = z.infer<
  typeof verifyResetPasswordTokenResponseSchema
>;
