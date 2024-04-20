import { JWT } from "@/libs/jwt";

export const emailVerificationTokenService = new JWT(
  process.env.EMAIL_VERIFICATION_TOKEN_SECRET!
);

export const passwordResetTokenService = new JWT(
  process.env.PASSWORD_RESET_TOKEN_SECRET!
);

export const inviteTokenService = new JWT(
  process.env.INVITE_VERIFICATION_TOKEN_SECRET!
);
