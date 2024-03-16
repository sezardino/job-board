import {
  createJobOfferRequestSchema,
  offersListRequestSchema,
} from "@/services/server/modules/job-offers/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../utils";
import { getOffersList } from "./get";
import { postCreateJobOffer } from "./post";

export const GET = withValidation({
  handler: getOffersList,
  schema: offersListRequestSchema,
  input: "search",
});

export const POST = withValidation({
  handler: postCreateJobOffer,
  schema: createJobOfferRequestSchema,
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
});
