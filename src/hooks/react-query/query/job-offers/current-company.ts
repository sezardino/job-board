import { apiService } from "@/services/api";
import { CurrentCompanyJobOffersRequest } from "@/services/bll/modules/job-offers/schema";
import { useQuery } from "@tanstack/react-query";

export const CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY = "my-company-offers";

export const useCurrentCompanyJobOffersQuery = (
  params: CurrentCompanyJobOffersRequest
) => {
  return useQuery({
    queryKey: [CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.jobOffers.currentCompany(params),
  });
};
