import { applyForOfferRequestSchema } from "@/services/bll/modules/application/schema";
import { offerApplicationsRequestSchema } from "@/services/bll/modules/application/schema/list";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../utils";
import { getOfferApplications } from "./get";
import { postApplyForOffer } from "./post";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getOfferApplications,
    "Cant get  offer applications applications list"
  ),
  schema: offerApplicationsRequestSchema,
  input: "search",
  role: [
    UserRoles.ADMIN,
    UserRoles.OWNER,
    UserRoles.MODERATOR,
    UserRoles.RECRUITER,
    UserRoles.SUB_ADMIN,
  ],
});

export const POST = withValidation({
  handler: withApiRouteHandler(postApplyForOffer, "Cant apply for  offer"),
  schema: applyForOfferRequestSchema,
  input: "formData",
});
