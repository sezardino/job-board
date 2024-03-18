import { verifyEmailTokenRequestSchema } from "@/services/bll/modules/auth/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { postVerifyEmail } from "./post";

export const POST = withValidation({
  handler: withApiRouteHandler(postVerifyEmail, "Cant verify email"),
  schema: verifyEmailTokenRequestSchema,
});
