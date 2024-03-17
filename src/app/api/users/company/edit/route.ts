import { withValidation } from "@/app/api/utils";
import { editCompanyUserRequestSchema } from "@/services/server/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { patchEditCompanyUser } from "./patch";

export const PATCH = withValidation({
  handler: patchEditCompanyUser,
  schema: editCompanyUserRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.OWNER],
});
