import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { UserRoles, UserStatus } from "@prisma/client";
import { z } from "zod";

export const adminUsersRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminUsersResponseSchema = z
  .object({
    users: z.array(
      z.object({
        email: z.string(),
        status: z.nativeEnum(UserStatus),
        id: z.string(),
        role: z.nativeEnum(UserRoles),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type AdminUsersRequest = z.infer<typeof adminUsersRequestSchema>;

export type AdminUsersResponse = z.infer<typeof adminUsersResponseSchema>;
