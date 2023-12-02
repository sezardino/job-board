import { z } from "zod";

export const inviteAdminRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const inviteAdminResponseSchema = z.object({
  user: z.object({
    email: z.string(),
    id: z.string(),
    role: z.string(),
  }),
});

export type InviteAdminRequest = z.infer<typeof inviteAdminRequestSchema>;

export type InviteAdminResponse = z.infer<typeof inviteAdminResponseSchema>;
