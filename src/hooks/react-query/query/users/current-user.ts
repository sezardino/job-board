import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const CURRENT_USER_PROFILE_QUERY_KEY = "current-user-profile";

export const useCurrentUserProfileQuery = () => {
  return useQuery({
    queryKey: [CURRENT_USER_PROFILE_QUERY_KEY],
    queryFn: () => apiService.users.currentUserProfile(),
    staleTime: Infinity,
    retry: false,
  });
};
