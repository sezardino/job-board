import { withValidation } from "@/app/api/utils";
import { inviteAdminRequestSchema } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { postInviteAdmin } from "./post";

export const POST = withValidation({
  handler: postInviteAdmin,
  schema: inviteAdminRequestSchema,
  role: [UserRoles.ADMIN],
});
