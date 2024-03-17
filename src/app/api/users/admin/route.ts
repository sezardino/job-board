import { adminUsersRequestSchema } from "@/services/server/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { getAdmins } from "./get";

export const GET = withValidation({
  handler: getAdmins,
  schema: adminUsersRequestSchema,
  role: [UserRoles.ADMIN],
  input: "search",
});
