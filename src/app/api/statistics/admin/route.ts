import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { adminStatisticsRequestSchema } from "@/services/bll/modules/statistics/schema";
import { UserRoles } from "@prisma/client";
import { getAdminStatistics } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getAdminStatistics, "Cant get admin statistics"),
  schema: adminStatisticsRequestSchema,
  input: "search",
  role: [UserRoles.ADMIN, UserRoles.SUB_ADMIN],
});
