import { apiService } from "@/services/api";
import { ResendVerificationEmailRequest } from "@/services/bll/modules/auth/schema/resend-verification-email";
import { useMutationHelper } from "../../helpers";

export const useResendVerificationEmailMutation = () =>
  useMutationHelper({
    mutationFn: (req: ResendVerificationEmailRequest) =>
      apiService.auth.resendVerifyEmail(req),
  });
