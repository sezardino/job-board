import { withApiRouteHandler, withValidation } from "../../utils";
import { getJobOffer } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getJobOffer, "Cant get job offer"),
});
