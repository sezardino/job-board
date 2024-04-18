import { AdminRoles } from "@/const";
import { adminUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getAdmins } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getAdmins, "Cant get admins"),
  schema: adminUsersRequestSchema,
  role: AdminRoles,
  input: "search",
});
