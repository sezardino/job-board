import { jobOfferApplicationsStatisticsRequestSchema } from "@/services/bll/modules/job-application/schema/job-offer-statistics";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getOfferApplicationsStatistics } from "./get";
import { UserRoles } from "@prisma/client";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getOfferApplicationsStatistics,
    "cant get job offer applications statistics"
  ),
  schema: jobOfferApplicationsStatisticsRequestSchema,
  input: "search",
  role: [
    UserRoles.ADMIN,
    UserRoles.OWNER,
    UserRoles.MODERATOR,
    UserRoles.RECRUITER,
    UserRoles.SUB_ADMIN,
  ],
});
