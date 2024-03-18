import { z } from "zod";

export enum VerifyEmailTokenStatus {
  Success = "success",
  NotFound = "not-found",
  Expired = "expired",
  Invalid = "invalid",
  AlreadyVerified = "already-verified",
}

export const verifyEmailTokenRequestSchema = z.object({
  token: z.string({ required_error: "token is required" }),
});

export const verifyEmailTokenResponseSchema = z.object({
  status: z.nativeEnum(VerifyEmailTokenStatus),
});

export type VerifyEmailTokenRequest = z.infer<
  typeof verifyEmailTokenRequestSchema
>;

export type VerifyEmailTokenResponse = z.infer<
  typeof verifyEmailTokenResponseSchema
>;
