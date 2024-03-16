import { adminCompaniesRequestSchema } from "@/services/server/modules/companies/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { getAllCompanies } from "./get";

export const GET = withValidation({
  handler: getAllCompanies,
  schema: adminCompaniesRequestSchema,
  input: "search",
  role: [UserRoles.ADMIN],
});
