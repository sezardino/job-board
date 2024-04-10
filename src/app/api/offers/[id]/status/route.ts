import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { changeOfferStatusRequestSchema } from "@/services/bll/modules/offers/schema";
import { UserRoles } from "@prisma/client";
import { patchChangeOfferStatus } from "./patch";

export const PATCH = withValidation({
  handler: withApiRouteHandler(
    patchChangeOfferStatus,
    "Cant change offer status"
  ),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
  schema: changeOfferStatusRequestSchema,
});
