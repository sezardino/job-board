import { withValidation } from "@/app/api/utils";
import { companiesUsersRequestSchema } from "@/services/server/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { getCompanyUsers } from "./get";

export const GET = withValidation({
  handler: getCompanyUsers,
  schema: companiesUsersRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.SUB_ADMIN],
  input: "search",
});
