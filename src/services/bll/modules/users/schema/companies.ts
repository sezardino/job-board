import {
  fileSchema,
  paginatedRequestSchema,
  paginatedResponseSchema,
} from "@/types";
import { UserRoles, UserStatus } from "@prisma/client";
import { z } from "zod";

export const companiesUsersRequestSchema = z
  .object({
    companyId: z.string().optional(),
    status: z.nativeEnum(UserStatus).optional(),
  })
  .merge(paginatedRequestSchema);

export const companiesUsersResponseSchema = z
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
        company: z.object({
          id: z.string(),
          name: z.string(),
        }),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type CompaniesUsersRequest = z.infer<typeof companiesUsersRequestSchema>;

export type CompaniesUsersResponse = z.infer<
  typeof companiesUsersResponseSchema
>;
