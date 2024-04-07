import { jobOfferApplicationsStatisticsRequestSchema } from "@/services/bll/modules/job-application/schema/job-offer-statistics";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getOfferApplicationsStatistics } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getOfferApplicationsStatistics,
    "cant get job offer applications statistics"
  ),
  schema: jobOfferApplicationsStatisticsRequestSchema,
  input: "search",
});
