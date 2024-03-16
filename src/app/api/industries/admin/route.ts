import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { getIndustriesForManage } from "./get";
import { adminIndustriesRequestSchema } from "@/services/server/modules/industries/schema";

export const GET = withValidation({
  handler: getIndustriesForManage,
  schema: adminIndustriesRequestSchema,
  role: [UserRoles.ADMIN],
});
