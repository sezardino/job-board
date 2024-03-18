import {
  fileSchema,
  paginatedRequestSchema,
  paginatedResponseSchema,
} from "@/types";
import { UserRoles, UserStatus } from "@prisma/client";
import { z } from "zod";

export const companyUsersRequestSchema = z
  .object({
    status: z.nativeEnum(UserStatus).optional(),
  })
  .merge(paginatedRequestSchema);

export const companyUsersResponseSchema = z
  .object({
    data: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        avatar: fileSchema.nullable(),
        isAcceptInvite: z.boolean(),
        status: z.nativeEnum(UserStatus),
        role: z.nativeEnum(UserRoles),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type CompanyUsersRequest = z.infer<typeof companyUsersRequestSchema>;

export type CompanyUsersResponse = z.infer<typeof companyUsersResponseSchema>;
