import { checkEmailAvailableRequestSchema } from "@/services/bll/modules/users/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getEmailAvailable } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getEmailAvailable,
    "Cant check email availability"
  ),
  schema: checkEmailAvailableRequestSchema,
  input: "search",
});
