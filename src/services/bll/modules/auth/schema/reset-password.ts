import { z } from "zod";

export const resetPasswordRequestSchema = z.object({
  password: z.string(),
  token: z.string(),
});

export const resetPasswordResponseSchema = z.object({
  success: z.boolean(),
});

export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;
export type ResetPasswordResponse = z.infer<typeof resetPasswordResponseSchema>;
