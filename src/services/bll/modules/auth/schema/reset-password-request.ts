import { z } from "zod";

export const resetPasswordRequestDtoSchema = z.object({
  email: z.string(),
});

export const resetPasswordRequestResponseSchema = z.object({
  success: z.boolean(),
});

export type ResetPasswordRequestDto = z.infer<
  typeof resetPasswordRequestDtoSchema
>;
export type ResetPasswordRequestResponse = z.infer<
  typeof resetPasswordRequestResponseSchema
>;
