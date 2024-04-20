import { apiService } from "@/services/api";
import { VerifyResetPasswordTokenRequest } from "@/services/bll/modules/auth/schema/verify-reset-password-token";
import { useQuery } from "@tanstack/react-query";

export const VERIFY_RESET_PASSWORD_TOKEN_QUERY_KEY =
  "verify-reset-password-token";

export const useVerifyResetPasswordTokenQuery = (
  params: VerifyResetPasswordTokenRequest
) => {
  return useQuery({
    queryKey: [VERIFY_RESET_PASSWORD_TOKEN_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.auth.verifyResetPasswordToken(params),
  });
};
