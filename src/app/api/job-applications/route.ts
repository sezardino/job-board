import { applyForJobOfferRequestSchema } from "@/services/bll/modules/job-application/schema";
import { jobOfferApplicationsRequestSchema } from "@/services/bll/modules/job-application/schema/list";
import { withApiRouteHandler, withValidation } from "../utils";
import { getJobOfferApplications } from "./get";
import { postApplyForJobOffer } from "./post";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getJobOfferApplications,
    "Cant get job offer applications applications list"
  ),
  schema: jobOfferApplicationsRequestSchema,
  input: "search",
});

export const POST = withValidation({
  handler: withApiRouteHandler(
    postApplyForJobOffer,
    "Cant apply for job offer"
  ),
  schema: applyForJobOfferRequestSchema,
  input: "formData",
});
