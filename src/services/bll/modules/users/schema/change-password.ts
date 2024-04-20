import { z } from "zod";

export const changePasswordRequestSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export const changePasswordResponseSchema = z.object({
  success: z.boolean(),
});

export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;
export type ChangePasswordResponse = z.infer<
  typeof changePasswordResponseSchema
>;
