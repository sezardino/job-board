import { editCompanyRequestSchema } from "@/services/server/modules/companies/schema";
import { withValidation } from "../utils";
import { getMyCompanyProfile } from "./get";
import { putEditCompany } from "./put";

export const GET = withValidation({
  handler: getMyCompanyProfile,
});

export const PUT = withValidation({
  handler: putEditCompany,
  schema: editCompanyRequestSchema,
  input: "formData",
  role: ["OWNER"],
});
