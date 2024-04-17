import { apiService } from "@/services/api";
import { OffersForManageRequest } from "@/services/bll/modules/offers/schema";
import { useQuery } from "@tanstack/react-query";

export const OFFERS_FOR_MANAGE_QUERY = "my-company-offers";

export const useOffersForManageQuery = (params: OffersForManageRequest) => {
  return useQuery({
    queryKey: [OFFERS_FOR_MANAGE_QUERY, ...Object.values(params)],
    queryFn: () => apiService.offers.currentCompany(params),
  });
};
