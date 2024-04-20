import { z } from "zod";

export const editUserProfileRequestSchema = z.object({
  name: z.string().optional(),
  avatar: z.any().optional().nullable(),
});

export const editUserProfileResponseSchema = z.object({
  success: z.boolean(),
});

export type EditUserProfileRequest = z.infer<
  typeof editUserProfileRequestSchema
>;
export type EditUserProfileResponse = z.infer<
  typeof editUserProfileResponseSchema
>;
