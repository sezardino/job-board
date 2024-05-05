import { inviteUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { postInviteUsers } from "./post";

export const POST = withValidation({
  handler: withApiRouteHandler(postInviteUsers, "Cant invite users"),
  schema: inviteUsersRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});
