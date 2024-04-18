import { AdminRoles, CompanyRoles } from "@/const";
import { changeApplicationStatusRequestSchema } from "@/services/bll/modules/application/schema";
import { previewOfferRequestSchema } from "@/services/bll/modules/offers/schema";
import { patchChangeOfferStatus } from "../../offers/[id]/status/patch";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getApplication } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getApplication, "Cant get application"),
  schema: previewOfferRequestSchema,
  input: "search",
  role: [...AdminRoles, ...CompanyRoles],
});

export const PATCH = withValidation({
  handler: withApiRouteHandler(
    patchChangeOfferStatus,
    "Cant change offer status"
  ),
  schema: changeApplicationStatusRequestSchema,
  input: "body",
  role: CompanyRoles,
});
