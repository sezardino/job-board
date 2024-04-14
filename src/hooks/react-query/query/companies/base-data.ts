import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const COMPANY_BASE_DATA = "company-base-data";

export const useCompanyBaseDataQuery = (companyId?: string) => {
  return useQuery({
    queryKey: [COMPANY_BASE_DATA, companyId],
    queryFn: () => apiService.companies.baseData(companyId),
  });
};
