import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../../utils";
import { deleteCancelInvite } from "./delete";
import { patchResendInvite } from "./patch";

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchResendInvite, "Cant resend invite"),
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});

export const DELETE = withValidation({
  handler: withApiRouteHandler(deleteCancelInvite, "Cant cancel invite"),
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});
