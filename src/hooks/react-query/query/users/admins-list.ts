import { apiService } from "@/services/api";
import { AdminIndustriesListRequest } from "@/services/server/modules/industries/schema/admin-list";
import { useQuery } from "@tanstack/react-query";

export const ADMINS_LIST_QUERY_KEY = "adminsList";

export const useAdminsListQuery = (params: AdminIndustriesListRequest) => {
  return useQuery({
    queryKey: [ADMINS_LIST_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.users.adminsList(params),
  });
};
