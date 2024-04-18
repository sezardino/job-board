import {
  companyProfileRequestSchema,
  editCompanyRequestSchema,
} from "@/services/bll/modules/companies/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../utils";
import { getCompanyProfile } from "./get";
import { putEditCompany } from "./put";

export const GET = withValidation({
  handler: withApiRouteHandler(getCompanyProfile, "Cant get company profile"),
  input: "search",
  schema: companyProfileRequestSchema,
});

export const PUT = withValidation({
  handler: withApiRouteHandler(putEditCompany, "Cant edit company"),
  schema: editCompanyRequestSchema,
  input: "formData",
  role: [UserRoles.OWNER],
});
