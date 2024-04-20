import { changePasswordRequestSchema } from "@/services/bll/modules/users/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { patchChangePassword } from "./patch";

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchChangePassword, "Cant change password"),
  schema: changePasswordRequestSchema,
  role: "logged-in",
});
