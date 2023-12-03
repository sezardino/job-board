import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { UserRoles, UserStatus } from "@prisma/client";
import { z } from "zod";

export const adminsListRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminsListResponseSchema = z
  .object({
    admins: z.array(
      z.object({
        email: z.string(),
        status: z.nativeEnum(UserStatus),
        id: z.string(),
        role: z.nativeEnum(UserRoles),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type AdminsListRequest = z.infer<typeof adminsListRequestSchema>;

export type AdminsListResponse = z.infer<typeof adminsListResponseSchema>;
