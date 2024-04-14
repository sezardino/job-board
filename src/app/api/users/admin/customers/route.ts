import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { AdminRoles } from "@/const";
import { customerUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { getCustomers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCustomers, "Cant get customers"),
  schema: customerUsersRequestSchema,
  role: AdminRoles,
  input: "search",
});
