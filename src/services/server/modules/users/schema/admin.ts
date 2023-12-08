import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { UserRoles, UserStatus } from "@prisma/client";
import { z } from "zod";

export const adminUsersRequestSchema = z
  .object({
    status: z.nativeEnum(UserStatus).optional(),
  })
  .merge(paginatedRequestSchema);

export const adminUsersResponseSchema = z
  .object({
    users: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        role: z.nativeEnum(UserRoles),
        status: z.nativeEnum(UserStatus),
        isEmailVerified: z.boolean(),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type AdminUsersRequest = z.infer<typeof adminUsersRequestSchema>;

export type AdminUsersResponse = z.infer<typeof adminUsersResponseSchema>;
