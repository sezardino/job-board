import { checkCompanyNameAvailableRequestSchema } from "@/services/bll/modules/companies/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getCompanyNameAvailability } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getCompanyNameAvailability,
    "Cant check company name availability"
  ),
  schema: checkCompanyNameAvailableRequestSchema,
  input: "search",
});
