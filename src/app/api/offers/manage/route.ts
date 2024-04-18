import { AdminRoles, CompanyRoles } from "@/const";
import { offersForManageRequestSchema } from "@/services/bll/modules/offers/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getOffersForManage } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getOffersForManage, "Cant get  offers"),
  schema: offersForManageRequestSchema,
  input: "search",
  role: [...AdminRoles, ...CompanyRoles],
});
