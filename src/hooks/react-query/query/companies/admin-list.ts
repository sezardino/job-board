import { apiService } from "@/services/api";
import { AdminCompaniesRequest } from "@/services/bll/modules/companies/schema";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_COMPANIES_LIST_QUERY_KEY = "admin-companies";

export const useAdminCompaniesListQuery = (params: AdminCompaniesRequest) => {
  return useQuery({
    queryKey: [ADMIN_COMPANIES_LIST_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.companies.admin(params),
  });
};
