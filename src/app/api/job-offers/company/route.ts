import { currentCompanyJobOffersRequestSchema } from "@/services/bll/modules/job-offers/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getCurrentCompanyJobOffers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getCurrentCompanyJobOffers,
    "Cant get job offers"
  ),
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
  schema: currentCompanyJobOffersRequestSchema,
  input: "search",
});
