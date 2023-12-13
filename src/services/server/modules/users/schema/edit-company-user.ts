import { UserRoles } from "@prisma/client";
import { z } from "zod";

export const editCompanyUserRequestSchema = z.object({
  id: z.string(),
  role: z.enum([UserRoles.MODERATOR, UserRoles.RECRUITER]),
});

export const editCompanyUserResponseSchema = z.object({
  success: z.boolean(),
});

export type EditCompanyUserRequest = z.infer<
  typeof editCompanyUserRequestSchema
>;
export type EditCompanyUserResponse = z.infer<
  typeof editCompanyUserResponseSchema
>;
