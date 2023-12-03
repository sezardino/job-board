import { apiService } from "@/services/api";
import { AdminCompaniesListRequest } from "@/services/server/modules/companies/schema/admin-list";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_COMPANIES_LIST_QUERY_KEY = "adminCompaniesList";

export const useAdminCompaniesListQuery = (
  params: AdminCompaniesListRequest
) => {
  return useQuery({
    queryKey: [ADMIN_COMPANIES_LIST_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.companies.adminList(params),
  });
};
