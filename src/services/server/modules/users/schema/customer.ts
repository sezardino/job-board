import {
  fileSchema,
  paginatedRequestSchema,
  paginatedResponseSchema,
} from "@/types";
import { UserStatus } from "@prisma/client";
import { z } from "zod";

export const customerUsersRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const customerUsersResponseSchema = z
  .object({
    users: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        avatar: fileSchema.nullable(),
        isAcceptInvite: z.boolean(),
        status: z.nativeEnum(UserStatus),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type CustomerUsersRequest = z.infer<typeof customerUsersRequestSchema>;

export type CustomerUsersResponse = z.infer<typeof customerUsersResponseSchema>;
