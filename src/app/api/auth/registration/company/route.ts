import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { companyRegistrationRequestSchema } from "@/services/bll/modules/auth/schema/company-registration";
import { postCompanyRegistration } from "./post";

export const POST = withValidation({
  handler: withApiRouteHandler(
    postCompanyRegistration,
    "Cant register company"
  ),
  schema: companyRegistrationRequestSchema,
});
