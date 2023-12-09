import { apiService } from "@/services/api";
import { CompaniesUsersRequest } from "@/services/server/modules/users/schema";
import { useQuery } from "@tanstack/react-query";

export const COMPANY_USERS_QUERY_KEY = "company-users";

export const useCompanyUsersQuery = (params: CompaniesUsersRequest) => {
  return useQuery({
    queryKey: [COMPANY_USERS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.users.companies(params),
  });
};
