import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { UserRoles } from "@prisma/client";
import { getBasicOfferData } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getBasicOfferData, "Cant get basic offer data"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
});
