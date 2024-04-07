import { apiService } from "@/services/api";
import { OfferApplicationsStatisticsRequest } from "@/services/bll/modules/application/schema/offer-statistics";
import { useQuery } from "@tanstack/react-query";

export const OFFER_APPLICATIONS_STATISTICS_QUERY_KEY =
  "offer-applications-statistics";

export const useOfferApplicationsStatisticsQuery = (
  params: OfferApplicationsStatisticsRequest,
  enabled = true
) => {
  return useQuery({
    queryKey: [
      OFFER_APPLICATIONS_STATISTICS_QUERY_KEY,
      ...Object.values(params),
    ],
    queryFn: () => apiService.applications.offerStatistics(params),
    enabled: !!params.offerId && enabled,
  });
};
