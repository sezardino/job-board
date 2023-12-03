import { apiService } from "@/services/api";
import { AdminIndustriesRequest } from "@/services/server/modules/industries/schema";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_INDUSTRIES_LIST_QUERY_KEY = "adminIndustriesList";

export const useAdminIndustriesListQuery = (params: AdminIndustriesRequest) => {
  return useQuery({
    queryKey: [ADMIN_INDUSTRIES_LIST_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.industries.adminList(params),
  });
};
