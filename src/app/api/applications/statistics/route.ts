import { offerApplicationsStatisticsRequestSchema } from "@/services/bll/modules/application/schema/offer-statistics";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getOfferApplicationsStatistics } from "./get";
import { AdminRoles, CompanyRoles } from "@/const";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getOfferApplicationsStatistics,
    "cant get offer applications statistics"
  ),
  schema: offerApplicationsStatisticsRequestSchema,
  input: "search",
  role: [...AdminRoles, ...CompanyRoles],
});
