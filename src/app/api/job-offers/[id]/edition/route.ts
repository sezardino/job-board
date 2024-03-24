import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { UserRoles } from "@prisma/client";
import { getJobOffer } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getJobOffer, "Cant get job offer"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
});
