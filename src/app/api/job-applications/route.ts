import { applyForJobOfferRequestSchema } from "@/services/bll/modules/job-application/schema";
import { withApiRouteHandler, withValidation } from "../utils";
import { postApplyForJobOffer } from "./post";

export const POST = withValidation({
  handler: withApiRouteHandler(
    postApplyForJobOffer,
    "Cant apply for job offer"
  ),
  schema: applyForJobOfferRequestSchema,
  input: "formData",
});
