import { previewJobOfferRequestSchema } from "@/services/bll/modules/job-offers/schema";
import { editJobOfferRequestSchema } from "@/services/bll/modules/job-offers/schema/edit";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { deleteJobOffer } from "./delete";
import { getJobOffer } from "./get";
import { patchEditJobOffer } from "./patch";

export const GET = withValidation({
  handler: withApiRouteHandler(getJobOffer, "Cant get job offer"),
  schema: previewJobOfferRequestSchema,
  input: "search",
});

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchEditJobOffer, "Cant edit job offer"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
  schema: editJobOfferRequestSchema,
});

export const DELETE = withValidation({
  handler: withApiRouteHandler(deleteJobOffer, "Cant delete job offer"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
});
