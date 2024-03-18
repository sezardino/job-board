import { editCompanyRequestSchema } from "@/services/bll/modules/companies/schema";
import { withApiRouteHandler, withValidation } from "../utils";
import { getMyCompanyProfile } from "./get";
import { putEditCompany } from "./put";

export const GET = withValidation({
  handler: withApiRouteHandler(getMyCompanyProfile, "Cant get company profile"),
});

export const PUT = withValidation({
  handler: withApiRouteHandler(putEditCompany, "Cant edit company"),
  schema: editCompanyRequestSchema,
  input: "formData",
  role: ["OWNER"],
});
