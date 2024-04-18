import { AdminRoles } from "@/const";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getBaseIndustryData } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getBaseIndustryData,
    "Cant get base industry data"
  ),
  role: AdminRoles,
});
