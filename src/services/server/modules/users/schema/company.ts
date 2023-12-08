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
        id: z.string(),
        name: z.string(),
        email: z.string(),
        isEmailVerified: z.boolean(),
        status: z.nativeEnum(UserStatus),
        role: z.nativeEnum(UserRoles),
        company: z.object({
          id: z.string(),
          name: z.string(),
          owner: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
          }),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type CompanyUsersRequest = z.infer<typeof companyUsersRequestSchema>;

export type CompanyUsersResponse = z.infer<typeof companyUsersResponseSchema>;
