import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const VERIFY_EMAIL_TOKEN_QUERY_KEY = "verify-email-token";

export const useCheckInviteTokenQuery = (token?: string) =>
  useQuery({
    queryFn: () => apiService.users.checkInviteToken(token!),
    queryKey: [VERIFY_EMAIL_TOKEN_QUERY_KEY, token],
    enabled: !!token,
  });
