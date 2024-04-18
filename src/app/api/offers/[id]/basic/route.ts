import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { offerBasicDataRequestSchema } from "@/services/bll/modules/offers/schema";
import { getBasicOfferData } from "./get";
import { AdminRoles, CompanyRoles } from "@/const";

export const GET = withValidation({
  handler: withApiRouteHandler(getBasicOfferData, "Cant get basic offer data"),
  schema: offerBasicDataRequestSchema,
  input: "search",
  role: [...AdminRoles, ...CompanyRoles],
});
