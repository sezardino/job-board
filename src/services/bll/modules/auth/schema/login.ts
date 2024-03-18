import { UserRoles } from "@prisma/client";
import { z } from "zod";

export enum LoginStatus {
  WrongCredentials = "wrong-credentials",
  EmailNotVerified = "not-verified",
  Inactive = "inactive",
  Blocked = "blocked",
  NotAcceptInvite = "not-accept-invite",
}

export const loginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z
  .object({
    status: z.nativeEnum(LoginStatus),
  })
  .or(
    z.object({
      avatar: z.string().optional(),
      companyId: z.string().optional(),
      email: z.string().email(),
      id: z.string(),
      role: z.nativeEnum(UserRoles),
    })
  );

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
