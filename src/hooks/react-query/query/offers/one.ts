import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const ONE_OFFER_QUERY_KEY = "one-offer-offers";

export const useOneOfferQuery = (id: string) => {
  return useQuery({
    queryKey: [ONE_OFFER_QUERY_KEY, id],
    queryFn: () => apiService.offers.one(id),
    enabled: !!id,
  });
};
