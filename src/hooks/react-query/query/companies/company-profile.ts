import { apiService } from "@/services/api";
import { CompanyProfileRequest } from "@/services/bll/modules/companies/schema";
import { useQuery } from "@tanstack/react-query";

export const COMPANY_PROFILE_QUERY_KEY = "company-profile";

export const useCompanyProfileQuery = (params: CompanyProfileRequest) => {
  return useQuery({
    queryKey: [COMPANY_PROFILE_QUERY_KEY],
    queryFn: () => apiService.companies.companyProfile(params),
  });
};
