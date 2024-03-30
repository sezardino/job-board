import { apiService } from "@/services/api";
import { PreviewJobOfferRequest } from "@/services/bll/modules/job-offers/schema";
import { useQuery } from "@tanstack/react-query";

export const PREVIEW_JOB_OFFER_QUERY_KEY = "one-offer-offers";

export const usePreviewJobOfferQuery = (
  dto: PreviewJobOfferRequest & { id: string }
) => {
  return useQuery({
    queryKey: [PREVIEW_JOB_OFFER_QUERY_KEY, ...Object.values(dto)],
    queryFn: () => apiService.jobOffers.one(dto),
    enabled: !!dto.id,
  });
};
