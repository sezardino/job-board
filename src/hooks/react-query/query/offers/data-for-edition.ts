import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const OFFER_EDITION_DATA = "offer-data-for-edition";

export const useOfferEditionDataQuery = (id?: string) => {
  return useQuery({
    queryKey: [OFFER_EDITION_DATA, id],
    queryFn: () => apiService.offers.editionData(id!),
    enabled: !!id,
  });
};
