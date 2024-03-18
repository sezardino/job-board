import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { companiesUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { getCompanyUsers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCompanyUsers, "Cant get company users"),
  schema: companiesUsersRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.SUB_ADMIN],
  input: "search",
});
