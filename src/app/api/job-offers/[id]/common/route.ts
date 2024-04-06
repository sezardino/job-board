import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { commonJobOffersRequestSchema } from "@/services/bll/modules/job-offers/schema";
import { getCommonJobOffers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCommonJobOffers, "Cant get common job offer"),
  schema: commonJobOffersRequestSchema,
  input: "search",
});
