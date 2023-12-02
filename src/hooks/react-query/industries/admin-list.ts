import { apiService } from "@/services/api";
import { AdminIndustriesListRequest } from "@/services/server/modules/industries/schema/admin-list";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_INDUSTRIES_LIST_QUERY_KEY = "adminIndustriesList";

export const useAdminIndustriesListQuery = (
  params: AdminIndustriesListRequest
) => {
  return useQuery({
    queryKey: [ADMIN_INDUSTRIES_LIST_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.industries.adminList(params),
  });
};
