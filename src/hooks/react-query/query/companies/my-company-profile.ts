import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const MY_COMPANY_PROFILE_QUERY_KEY = "my-company-profile";

export const useMyCompanyProfileQuery = () => {
  return useQuery({
    queryKey: [MY_COMPANY_PROFILE_QUERY_KEY],
    queryFn: () => apiService.companies.myCompanyProfile(),
  });
};
