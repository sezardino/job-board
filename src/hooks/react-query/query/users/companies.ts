import { apiService } from "@/services/api";
import { CompaniesUsersRequest } from "@/services/server/modules/users/schema";
import { useQuery } from "@tanstack/react-query";

export const COMPANIES_USERS_QUERY_KEY = "companies-users";

export const useCompaniesUsersQuery = (params: CompaniesUsersRequest) => {
  return useQuery({
    queryKey: [COMPANIES_USERS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.users.companies(params),
  });
};
