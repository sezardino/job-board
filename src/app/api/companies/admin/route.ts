import { adminCompaniesRequestSchema } from "@/services/bll/modules/companies/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getAllCompanies } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getAllCompanies, "Cant get companies"),
  schema: adminCompaniesRequestSchema,
  input: "search",
  role: [UserRoles.ADMIN],
});
