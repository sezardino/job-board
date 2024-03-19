import { previewJobOfferRequestSchema } from "@/services/bll/modules/job-offers/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getJobOffer } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getJobOffer, "Cant get job offer"),
  schema: previewJobOfferRequestSchema,
  input: "search",
});
