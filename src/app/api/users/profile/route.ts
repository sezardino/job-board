import { editUserProfileRequestSchema } from "@/services/bll/modules/users/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { patchEditUserProfile } from "./patch";

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchEditUserProfile, "Cant edit user profile"),
  schema: editUserProfileRequestSchema,
  input: "formData",
  role: "logged-in",
});
