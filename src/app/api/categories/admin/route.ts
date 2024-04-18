import { AdminRoles } from "@/const";
import { adminCategoriesRequestSchema } from "@/services/bll/modules/categories/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getCategoriesForManage } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCategoriesForManage, "Cant get categories"),
  schema: adminCategoriesRequestSchema,
  input: "search",
  role: AdminRoles,
});
