import { AdminRoles } from "@/const";
import { adminCategoriesRequestSchema } from "@/services/bll/modules/categories/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getOffersForManage } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getOffersForManage, "Cant get offers"),
  schema: adminCategoriesRequestSchema,
  input: "search",
  role: AdminRoles,
});
