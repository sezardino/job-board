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

export type InviteUsersRequest = z.infer<typeof inviteUsersRequestSchema>;
export type InviteUsersResponse = z.infer<typeof inviteUsersResponseSchema>;

export type CancelInviteResponse = z.infer<typeof cancelInviteResponseSchema>;

export type ResendInviteResponse = z.infer<typeof resendInviteResponseSchema>;
