import { verifyEmailTokenRequestSchema } from "@/services/bll/modules/auth/schema";
import { withValidation } from "../../utils";
import { postVerifyEmail } from "./post";

export const POST = withValidation({
  handler: postVerifyEmail,
  schema: verifyEmailTokenRequestSchema,
});
