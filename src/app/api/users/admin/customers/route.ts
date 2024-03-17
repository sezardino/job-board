import { withValidation } from "@/app/api/utils";
import { customerUsersRequestSchema } from "@/services/server/modules/users/schema";
import { UserRoles } from "@prisma/client";
import { getCustomers } from "./get";

export const GET = withValidation({
  handler: getCustomers,
  schema: customerUsersRequestSchema,
  role: [UserRoles.ADMIN, UserRoles.SUB_ADMIN],
  input: "search",
});
