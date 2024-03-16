import { withValidation } from "@/app/api/utils";
import { companyRegistrationRequestSchema } from "@/services/server/modules/auth/schema/company-registration";
import { postCompanyRegistration } from "./post";

export const POST = withValidation({
  handler: postCompanyRegistration,
  schema: companyRegistrationRequestSchema,
});
