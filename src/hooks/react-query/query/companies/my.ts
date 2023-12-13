import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const MY_COMPANY_QUERY_KEY = "my-company";

export const useMyCompanyQuery = () => {
  return useQuery({
    queryKey: [MY_COMPANY_QUERY_KEY],
    queryFn: () => apiService.companies.my(),
  });
};
