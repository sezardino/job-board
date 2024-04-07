import { changeJobApplicationStatusRequestSchema } from "@/services/bll/modules/job-application/schema";
import { UserRoles } from "@prisma/client";
import { patchEditApplicationStatus } from "./patch";
import { withValidation, withApiRouteHandler } from "@/app/api/utils";

export const PATCH = withValidation({
  handler: withApiRouteHandler(
    patchEditApplicationStatus,
    "Cant edit job application status"
  ),
  schema: changeJobApplicationStatusRequestSchema,
  role: [
    UserRoles.ADMIN,
    UserRoles.OWNER,
    UserRoles.MODERATOR,
    UserRoles.RECRUITER,
    UserRoles.SUB_ADMIN,
  ],
});
