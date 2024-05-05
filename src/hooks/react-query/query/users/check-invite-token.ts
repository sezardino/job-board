import { apiService } from "@/services/api";
import { CheckInviteTokenStatus } from "@/services/bll/modules/users/schema";
import { CustomException } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const VERIFY_EMAIL_TOKEN_QUERY_KEY = "verify-email-token";

type Error = AxiosError<
  CustomException<{ type: CheckInviteTokenStatus; email?: string }>
>;

export const useCheckInviteTokenQuery = (token?: string) =>
  useQuery<{ success: boolean }, Error>({
    queryFn: () => apiService.users.checkInviteToken(token!),
    queryKey: [VERIFY_EMAIL_TOKEN_QUERY_KEY, token],
    enabled: !!token,
  });
