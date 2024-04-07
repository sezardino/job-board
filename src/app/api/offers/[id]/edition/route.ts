import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { UserRoles } from "@prisma/client";
import { getOffer } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getOffer, "Cant get offer"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
});
