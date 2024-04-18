import { AdminRoles } from "@/const";
import { withApiRouteHandler, withValidation } from "../../../utils";
import { getCompanyBaseData } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getCompanyBaseData,
    "Cant get company base data"
  ),
  role: AdminRoles,
});
