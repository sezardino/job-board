import {
  cancelInviteRequestSchema,
  inviteUsersRequestSchema,
  resendInviteRequestSchema,
} from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { patchResendInvite } from "./patch";
import { postInviteUsers } from "./post";

export const POST = withValidation({
  handler: withApiRouteHandler(postInviteUsers, "Cant invite users"),
  schema: inviteUsersRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchResendInvite, "Cant resend invite"),
  schema: resendInviteRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});

export const DELETE = withValidation({
  handler: withApiRouteHandler(postInviteUsers, "Cant cancel invite"),
  schema: cancelInviteRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});
