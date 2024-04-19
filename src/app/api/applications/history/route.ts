import { AdminRoles } from "@/const";
import { applicationHistoryRequestSchema } from "@/services/bll/modules/application/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getApplicationHistory } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getApplicationHistory,
    "Cant get applications history"
  ),
  schema: applicationHistoryRequestSchema,
  input: "search",
  role: [UserRoles.CUSTOMER, ...AdminRoles],
});
