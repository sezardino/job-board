import { previewOfferRequestSchema } from "@/services/bll/modules/offers/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getApplication } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getApplication, "Cant get application"),
  schema: previewOfferRequestSchema,
  input: "search",
  role: [
    UserRoles.ADMIN,
    UserRoles.OWNER,
    UserRoles.MODERATOR,
    UserRoles.RECRUITER,
    UserRoles.SUB_ADMIN,
  ],
});
