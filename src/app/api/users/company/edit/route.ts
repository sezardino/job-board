import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { editCompanyUserRequestSchema } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { patchEditCompanyUser } from "./patch";

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchEditCompanyUser, "Cant edit company user"),
  schema: editCompanyUserRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});
