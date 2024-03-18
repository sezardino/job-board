import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { customerUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { getCustomers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCustomers, "Cant get customers"),
  schema: customerUsersRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.SUB_ADMIN],
  input: "search",
});
