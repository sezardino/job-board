import { UserRoles } from "@prisma/client";
import { z } from "zod";

export const currentUserProfileResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar: z.object({ url: z.string() }).nullable(),
  role: z.nativeEnum(UserRoles),
});

export type CurrentUserProfileResponse = z.infer<
  typeof currentUserProfileResponseSchema
>;
