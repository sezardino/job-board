import { apiService } from "@/services/api";
import { OfferBasicDataRequest } from "@/services/bll/modules/offers/schema";
import { useQuery } from "@tanstack/react-query";

export const OFFER_BASIC_DATA_QUERY_KEY = "offer-basic-data";

export const useOfferBasicDataQuery = (
  params: OfferBasicDataRequest & { offerId: string }
) => {
  return useQuery({
    queryKey: [OFFER_BASIC_DATA_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.offers.basicData(params),
    enabled: !!params.offerId,
  });
};
