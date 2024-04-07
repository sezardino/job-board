import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { changeApplicationStatusRequestSchema } from "@/services/bll/modules/application/schema";
import { UserRoles } from "@prisma/client";
import { patchEditApplicationStatus } from "./patch";

export const PATCH = withValidation({
  handler: withApiRouteHandler(
    patchEditApplicationStatus,
    "Cant edit application status"
  ),
  schema: changeApplicationStatusRequestSchema,
  role: [
    UserRoles.ADMIN,
    UserRoles.OWNER,
    UserRoles.MODERATOR,
    UserRoles.RECRUITER,
    UserRoles.SUB_ADMIN,
  ],
});
