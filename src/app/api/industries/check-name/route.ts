import { checkIndustryNameAvailableRequestSchema } from "@/services/bll/modules/industries/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getIndustryNameAvailable } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getIndustryNameAvailable,
    "Cant check industry name availability"
  ),
  schema: checkIndustryNameAvailableRequestSchema,
  input: "params",
  role: [UserRoles.ADMIN],
});
