import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { AdminRoles } from "@/const";
import { companiesUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { getCompanyUsers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCompanyUsers, "Cant get company users"),
  schema: companiesUsersRequestSchema,
  input: "search",
  role: AdminRoles,
});
