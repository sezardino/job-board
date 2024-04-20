import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import {
  resetPasswordRequestDtoSchema,
  resetPasswordRequestSchema,
} from "@/services/bll/modules/auth/schema";
import { verifyResetPasswordTokenRequestSchema } from "@/services/bll/modules/auth/schema/verify-reset-password-token";
import { getVerifyResetPasswordToken } from "./get";
import { patchResetPassword } from "./patch";
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

export const POST = withValidation({
  handler: withApiRouteHandler(postResetPassword, "Cant reset password"),
  schema: resetPasswordRequestDtoSchema,
  input: "body",
  role: "public-only",
});

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchResetPassword, "Cant change password"),
  schema: resetPasswordRequestSchema,
  input: "body",
  role: "public-only",
});
