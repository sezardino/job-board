import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { resetPasswordRequestSchema } from "@/services/bll/modules/users/schema";
import { verifyResetPasswordTokenRequestSchema } from "@/services/bll/modules/users/schema/verify-reset-password-token";
import { getVerifyResetPasswordToken } from "./get";
import { postResetPassword } from "./post";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getVerifyResetPasswordToken,
    "Cant verify reset password token"
  ),
  schema: verifyResetPasswordTokenRequestSchema,
  input: "search",
  role: "public-only",
});

export const PATCH = withValidation({
  handler: withApiRouteHandler(postResetPassword, "Cant reset password"),
  schema: resetPasswordRequestSchema,
  role: "public-only",
});
