import { currentCompanyOffersRequestSchema } from "@/services/bll/modules/offers/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getCurrentCompanyOffers } from "./get";
import { AdminRoles, CompanyRoles } from "@/const";

export const GET = withValidation({
  handler: withApiRouteHandler(getCurrentCompanyOffers, "Cant get  offers"),
  schema: currentCompanyOffersRequestSchema,
  input: "search",
  role: [...AdminRoles, ...CompanyRoles],
});
