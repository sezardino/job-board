import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const OFFER_BASIC_DATA_QUERY_KEY = "offer-basic-data";

export const useOfferBasicDataQuery = (id?: string) => {
  return useQuery({
    queryKey: [OFFER_BASIC_DATA_QUERY_KEY, id],
    queryFn: () => apiService.offers.basicData(id!),
    enabled: !!id,
  });
};
