import { adminUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getAdmins } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getAdmins, "Cant get admins"),
  schema: adminUsersRequestSchema,
  role: [UserRoles.ADMIN],
  input: "search",
});
