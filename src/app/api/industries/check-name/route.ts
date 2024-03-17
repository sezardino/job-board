import { checkIndustryNameAvailableRequestSchema } from "@/services/bll/modules/industries/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { getIndustryNameAvailable } from "./get";

export const GET = withValidation({
  handler: getIndustryNameAvailable,
  schema: checkIndustryNameAvailableRequestSchema,
  input: "params",
  role: [UserRoles.ADMIN],
});
