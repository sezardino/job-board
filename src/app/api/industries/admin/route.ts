import { adminIndustriesRequestSchema } from "@/services/bll/modules/industries/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getIndustriesForManage } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getIndustriesForManage, "Cant get industries"),
  schema: adminIndustriesRequestSchema,
  role: [UserRoles.ADMIN],
  input: "search",
});
