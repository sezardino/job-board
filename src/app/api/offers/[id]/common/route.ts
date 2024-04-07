import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { commonOffersRequestSchema } from "@/services/bll/modules/offers/schema";
import { getCommonOffers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCommonOffers, "Cant get common job offer"),
  schema: commonOffersRequestSchema,
  input: "search",
});
