import { apiService } from "@/services/api";
import { AdminUsersRequest } from "@/services/server/modules/users/schema";
import { useQuery } from "@tanstack/react-query";

export const ADMINS_USERS_QUERY_KEY = "admin-users";

export const useAdminUsersQuery = (params: AdminUsersRequest) => {
  return useQuery({
    queryKey: [ADMINS_USERS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.users.admins(params),
  });
};
