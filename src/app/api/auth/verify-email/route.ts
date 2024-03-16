import { verifyEmailTokenRequestSchema } from "@/services/server/modules/auth/schema";
import { withValidation } from "../../utils";
import { postVerifyEmail } from "./post";

export const POST = withValidation({
  handler: postVerifyEmail,
  schema: verifyEmailTokenRequestSchema,
});
