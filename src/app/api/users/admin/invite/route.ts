import { withValidation } from "@/app/api/utils";
import { postInviteAdmin } from "./post";
import { inviteAdminRequestSchema } from "@/services/server/modules/users/schema";
import { UserRoles } from "@prisma/client";

export const POST = withValidation({
  handler: postInviteAdmin,
  schema: inviteAdminRequestSchema,
  role: [UserRoles.ADMIN],
});
