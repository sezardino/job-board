import { apiService } from "@/services/api";
import { JobOfferApplicationsStatisticsRequest } from "@/services/bll/modules/job-application/schema/job-offer-statistics";
import { useQuery } from "@tanstack/react-query";

export const Job_OFFER_APPLICATIONS_STATISTICS_QUERY_KEY =
  "job-offer-applications-statistics";

export const useJobOfferApplicationsStatisticsQuery = (
  params: JobOfferApplicationsStatisticsRequest,
  enabled = true
) => {
  return useQuery({
    queryKey: [
      Job_OFFER_APPLICATIONS_STATISTICS_QUERY_KEY,
      ...Object.values(params),
    ],
    queryFn: () => apiService.jobApplications.offerStatistics(params),
    enabled: !!params.offerId && enabled,
  });
};
