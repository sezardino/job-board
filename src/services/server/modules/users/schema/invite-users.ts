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

export type InviteUsersRequest = z.infer<typeof inviteUsersRequestSchema>;
export type InviteUsersResponse = z.infer<typeof inviteUsersResponseSchema>;
