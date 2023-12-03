import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { UserRoles, UserStatus } from "@prisma/client";
import { z } from "zod";

export const companyUsersRequestSchema = z
  .object({
    companyId: z.string().optional(),
    status: z.nativeEnum(UserStatus).optional(),
  })
  .merge(paginatedRequestSchema);

export const companyUsersResponseSchema = z
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

export type CompanyUsersRequest = z.infer<typeof companyUsersRequestSchema>;

export type CompanyUsersResponse = z.infer<typeof companyUsersResponseSchema>;
