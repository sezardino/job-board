import { apiService } from "@/services/api";
import { AdminIndustriesRequest } from "@/services/bll/modules/industries/schema";
import { useQuery } from "@tanstack/react-query";

export const CUSTOMERS_USERS_QUERY_KEY = "customers-users";

export const useCustomersUsersQuery = (params: AdminIndustriesRequest) => {
  return useQuery({
    queryKey: [CUSTOMERS_USERS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.users.customers(params),
  });
};
