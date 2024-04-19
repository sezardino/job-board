import { withApiRouteHandler, withValidation } from "../../utils";
import { patchChangePassword } from "./patch";

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchChangePassword, "Cant change password"),
});
