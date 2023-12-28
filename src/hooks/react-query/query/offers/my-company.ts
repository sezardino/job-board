import { apiService } from "@/services/api";
import { CompanyOffersRequest } from "@/services/server/modules/job-offers/scema";
import { useQuery } from "@tanstack/react-query";

export const MY_COMPANY_OFFERS_QUERY_KEY = "my-company-offers";

export const useMyCompanyOffersQuery = (
  params: CompanyOffersRequest & { companyId: string }
) => {
  return useQuery({
    queryKey: [MY_COMPANY_OFFERS_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.offers.myCompany(params),
    enabled: !!params.companyId,
  });
};
