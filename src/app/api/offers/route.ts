import {
  createOfferRequestSchema,
  offersListRequestSchema,
} from "@/services/bll/modules/offers/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../utils";
import { getOffersList } from "./get";
import { postCreateOffer } from "./post";

export const GET = withValidation({
  handler: withApiRouteHandler(getOffersList, "Cant get offers"),
  schema: offersListRequestSchema,
  input: "search",
});

export const POST = withValidation({
  handler: postCreateOffer,
  schema: createOfferRequestSchema,
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
});
