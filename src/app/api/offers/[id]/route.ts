import { previewOfferRequestSchema } from "@/services/bll/modules/offers/schema";
import { editOfferRequestSchema } from "@/services/bll/modules/offers/schema/edit";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { deleteOffer } from "./delete";
import { getOffer } from "./get";
import { patchEditOffer } from "./patch";

export const GET = withValidation({
  handler: withApiRouteHandler(getOffer, "Cant get job offer"),
  schema: previewOfferRequestSchema,
  input: "search",
});

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchEditOffer, "Cant edit job offer"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
  schema: editOfferRequestSchema,
});

export const DELETE = withValidation({
  handler: withApiRouteHandler(deleteOffer, "Cant delete job offer"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
});
