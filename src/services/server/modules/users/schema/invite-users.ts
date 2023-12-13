import { UserRoles } from "@prisma/client";
import { z } from "zod";

export const inviteUsersRequestSchema = z.object({
  users: z
    .array(
      z.object({
        email: z.string().email(),
        role: z.nativeEnum(UserRoles),
      })
    )
    .max(5),
});

export const inviteUsersResponseSchema = z.object({
  users: z
    .array(
      z.object({
        email: z.string().email(),
      })
    )
    .max(5),
});

export const cancelInviteRequestSchema = z.object({
  id: z.string(),
});

export const cancelInviteResponseSchema = z.object({
  success: z.boolean(),
});

export const resendInviteRequestSchema = z.object({
  id: z.string(),
});

export const resendInviteResponseSchema = z.object({
  success: z.boolean(),
});

export type InviteUsersRequest = z.infer<typeof inviteUsersRequestSchema>;
export type InviteUsersResponse = z.infer<typeof inviteUsersResponseSchema>;

export type CancelInviteRequest = z.infer<typeof cancelInviteRequestSchema>;
export type CancelInviteResponse = z.infer<typeof cancelInviteResponseSchema>;

export type ResendInviteRequest = z.infer<typeof resendInviteRequestSchema>;
export type ResendInviteResponse = z.infer<typeof resendInviteResponseSchema>;
