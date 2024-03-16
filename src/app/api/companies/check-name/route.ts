import { checkCompanyNameAvailableRequestSchema } from "@/services/server/modules/companies/schema";
import { withValidation } from "../../utils";
import { getCompanyNameAvailability } from "./get";

export const GET = withValidation({
  handler: getCompanyNameAvailability,
  schema: checkCompanyNameAvailableRequestSchema,
  input: "params",
});
