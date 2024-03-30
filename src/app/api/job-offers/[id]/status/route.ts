import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { changeJobOfferStatusRequestSchema } from "@/services/bll/modules/job-offers/schema";
import { UserRoles } from "@prisma/client";
import { patchChangeJobOfferStatus } from "./patch";

export const PATCH = withValidation({
  handler: withApiRouteHandler(
    patchChangeJobOfferStatus,
    "Cant change job offer status"
  ),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
  schema: changeJobOfferStatusRequestSchema,
});
