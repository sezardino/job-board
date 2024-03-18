import { companiesUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getCompanyUsers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCompanyUsers, "Cant get company users"),
  schema: companiesUsersRequestSchema,
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
  input: "search",
});
