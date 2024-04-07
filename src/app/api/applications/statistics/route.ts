import { offerApplicationsStatisticsRequestSchema } from "@/services/bll/modules/application/schema/offer-statistics";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getOfferApplicationsStatistics } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getOfferApplicationsStatistics,
    "cant get job offer applications statistics"
  ),
  schema: offerApplicationsStatisticsRequestSchema,
  input: "search",
  role: [
    UserRoles.ADMIN,
    UserRoles.OWNER,
    UserRoles.MODERATOR,
    UserRoles.RECRUITER,
    UserRoles.SUB_ADMIN,
  ],
});
