import { withValidation } from "@/app/api/utils";
import { resendVerificationEmailRequestSchema } from "@/services/bll/modules/auth/schema";
import { postResendVerificationEmail } from "./post";

export const POST = withValidation({
  handler: postResendVerificationEmail,
  schema: resendVerificationEmailRequestSchema,
});
