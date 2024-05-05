import { UserRoles } from "@prisma/client";
import { z } from "zod";

const AcceptedRolesToInvite = {
  [UserRoles.MODERATOR]: UserRoles.MODERATOR,
  [UserRoles.RECRUITER]: UserRoles.RECRUITER,
  [UserRoles.SUB_ADMIN]: UserRoles.SUB_ADMIN,
} as const;

export type AcceptedRolesToInvite =
  (typeof AcceptedRolesToInvite)[keyof typeof AcceptedRolesToInvite];

export const inviteUsersRequestSchema = z.object({
  users: z
    .array(
      z.object({
        email: z.string().email(),
        role: z.nativeEnum(AcceptedRolesToInvite),
      })
    )
    .max(5),
});

export const inviteUsersResponseSchema = z.object({
  users: z.array(
    z.object({
      email: z.string().email(),
      success: z.boolean(),
    })
  ),
});

export const cancelInviteResponseSchema = z.object({
  success: z.boolean(),
});

export const resendInviteResponseSchema = z.object({
  success: z.boolean(),
});

export const checkInviteTokenRequestSchema = z.object({
  token: z.string(),
});
export const checkInviteTokenResponseSchema = z.object({
  success: z.boolean(),
});

export const acceptInviteRequestSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export const acceptInviteResponseSchema = z.object({
  success: z.boolean(),
});

export enum CheckInviteTokenStatus {
  Success = "success",
  NotFound = "not-found",
  Expired = "expired",
  Invalid = "invalid",
  Accepted = "accepted",
}

export type AcceptInviteRequest = z.infer<typeof acceptInviteRequestSchema>;
export type AcceptInviteResponse = z.infer<typeof acceptInviteResponseSchema>;

export type CheckInviteTokenRequest = z.infer<
  typeof checkInviteTokenRequestSchema
>;
export type CheckInviteTokenResponse = z.infer<
  typeof checkInviteTokenResponseSchema
>;

export type InviteUsersRequest = z.infer<typeof inviteUsersRequestSchema>;
export type InviteUsersResponse = z.infer<typeof inviteUsersResponseSchema>;

export type CancelInviteResponse = z.infer<typeof cancelInviteResponseSchema>;

export type ResendInviteResponse = z.infer<typeof resendInviteResponseSchema>;
