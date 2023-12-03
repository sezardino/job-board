import { apiService } from "@/services/api";
import { CompanyUsersRequest } from "@/services/server/modules/users/schema";
import { useQuery } from "@tanstack/react-query";

export const COMPANY_USERS_QUERY_KEY = "company-users";

export const useCompanyUsersQuery = (params: CompanyUsersRequest) => {
  return useQuery({
    queryKey: [COMPANY_USERS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.users.companies(params),
  });
};
