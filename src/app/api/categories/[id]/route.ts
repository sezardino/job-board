import { AdminRoles } from "@/const";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getBaseCategoryData } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getBaseCategoryData,
    "Cant get base category data"
  ),
  role: AdminRoles,
});
