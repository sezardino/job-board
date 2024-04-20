import { withApiRouteHandler, withValidation } from "../../utils";
import { getCurrentUserProfile } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getCurrentUserProfile,
    "Cant get current user profile"
  ),
  role: "logged-in",
});
