import { adminIndustriesRequestSchema } from "@/services/bll/modules/industries/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { getIndustriesForManage } from "./get";

export const GET = withValidation({
  handler: getIndustriesForManage,
  schema: adminIndustriesRequestSchema,
  role: [UserRoles.ADMIN],
  input: "search",
});
