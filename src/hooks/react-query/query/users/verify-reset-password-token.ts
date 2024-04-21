import { apiService } from "@/services/api";
import {
  VerifyResetPasswordTokenErrors,
  VerifyResetPasswordTokenRequest,
} from "@/services/bll/modules/auth/schema/verify-reset-password-token";
import { CustomException } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const VERIFY_RESET_PASSWORD_TOKEN_QUERY_KEY =
  "verify-reset-password-token";

type Error = AxiosError<
  CustomException<{ type: VerifyResetPasswordTokenErrors; email?: string }>
>;

export const useVerifyResetPasswordTokenQuery = (
  params: VerifyResetPasswordTokenRequest
) => {
  return useQuery<{ success: boolean }, Error>({
    queryKey: [VERIFY_RESET_PASSWORD_TOKEN_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.auth.verifyResetPasswordToken(params),
    retry: false,
  });
};
