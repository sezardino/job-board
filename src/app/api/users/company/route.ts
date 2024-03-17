import { companiesUsersRequestSchema } from "@/services/bll/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { getCompanyUsers } from "./get";

export const GET = withValidation({
  handler: getCompanyUsers,
  schema: companiesUsersRequestSchema,
  role: [UserRoles.OWNER, UserRoles.MODERATOR],
  input: "search",
});
