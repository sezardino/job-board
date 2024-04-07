import { apiService } from "@/services/api";
import { JobOfferApplicationsRequest } from "@/services/bll/modules/job-application/schema/list";
import { useQuery } from "@tanstack/react-query";

export const JOB_APPLICATION_LIST_QUERY_KEY = "job-application-list";

export const useJobOfferApplicationsQuery = (
  params: JobOfferApplicationsRequest,
  enabled = true
) => {
  return useQuery({
    queryKey: [JOB_APPLICATION_LIST_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.jobApplications.list(params),
    enabled: !!params.offerId && enabled,
  });
};
