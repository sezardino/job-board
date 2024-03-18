import {
  createJobOfferRequestSchema,
  offersListRequestSchema,
} from "@/services/bll/modules/job-offers/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../utils";
import { getOffersList } from "./get";
import { postCreateJobOffer } from "./post";

export const GET = withValidation({
  handler: withApiRouteHandler(getOffersList, "Cant get job offers"),
  schema: offersListRequestSchema,
  input: "search",
});

export const POST = withValidation({
  handler: postCreateJobOffer,
  schema: createJobOfferRequestSchema,
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
});
