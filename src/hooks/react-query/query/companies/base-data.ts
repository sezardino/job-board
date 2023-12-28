import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const MY_COMPANY_BASE_DATA = "admin-companies";

export const useMyCompanyBaseDataQuery = () => {
  return useQuery({
    queryKey: [MY_COMPANY_BASE_DATA],
    queryFn: () => apiService.companies.myCompanyBaseData(),
  });
};
