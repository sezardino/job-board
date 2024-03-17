import {
  cancelInviteRequestSchema,
  inviteUsersRequestSchema,
  resendInviteRequestSchema,
} from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { patchResendInvite } from "./patch";
import { postInviteUsers } from "./post";

export const POST = withValidation({
  handler: postInviteUsers,
  schema: inviteUsersRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});

export const PATCH = withValidation({
  handler: patchResendInvite,
  schema: resendInviteRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});

export const DELETE = withValidation({
  handler: postInviteUsers,
  schema: cancelInviteRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});
