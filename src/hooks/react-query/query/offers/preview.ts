import { apiService } from "@/services/api";
import { PreviewOfferRequest } from "@/services/bll/modules/offers/schema";
import { useQuery } from "@tanstack/react-query";

export const PREVIEW_OFFER_QUERY_KEY = "one-offer-offers";

export const usePreviewOfferQuery = (
  dto: PreviewOfferRequest & { id: string }
) => {
  return useQuery({
    queryKey: [PREVIEW_OFFER_QUERY_KEY, ...Object.values(dto)],
    queryFn: () => apiService.offers.one(dto),
    enabled: !!dto.id,
  });
};
