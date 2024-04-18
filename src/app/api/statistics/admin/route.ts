import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { AdminRoles } from "@/const";
import { adminStatisticsRequestSchema } from "@/services/bll/modules/statistics/schema";
import { getAdminStatistics } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getAdminStatistics, "Cant get admin statistics"),
  schema: adminStatisticsRequestSchema,
  input: "search",
  role: AdminRoles,
});
