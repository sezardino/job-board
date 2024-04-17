import { apiService } from "@/services/api";
import { OffersForManageRequest } from "@/services/bll/modules/offers/schema";
import { useQuery } from "@tanstack/react-query";

export const CURRENT_COMPANY_OFFERS_QUERY_KEY = "my-company-offers";

export const useCurrentCompanyOffersQuery = (
  params: OffersForManageRequest
) => {
  return useQuery({
    queryKey: [CURRENT_COMPANY_OFFERS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.offers.currentCompany(params),
  });
};
