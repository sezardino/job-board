import { previewJobOfferRequestSchema } from "@/services/bll/modules/job-offers/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getApplication } from "./get";
import { UserRoles } from "@prisma/client";

export const GET = withValidation({
  handler: withApiRouteHandler(getApplication, "Cant get application"),
  schema: previewJobOfferRequestSchema,
  input: "search",
  role: [
    UserRoles.ADMIN,
    UserRoles.OWNER,
    UserRoles.MODERATOR,
    UserRoles.RECRUITER,
    UserRoles.SUB_ADMIN,
  ],
});
