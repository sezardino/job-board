import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { UserRoles, UserStatus } from "@prisma/client";
import { z } from "zod";

export const customerUsersRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const customerUsersResponseSchema = z
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

export type CustomerUsersRequest = z.infer<typeof customerUsersRequestSchema>;

export type CustomerUsersResponse = z.infer<typeof customerUsersResponseSchema>;
