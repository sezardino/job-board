import { apiService } from "@/services/api";
import { OfferApplicationsRequest } from "@/services/bll/modules/application/schema/list";
import { useQuery } from "@tanstack/react-query";

export const APPLICATION_LIST_QUERY_KEY = "application-list";

export const useOfferApplicationsQuery = (
  params: OfferApplicationsRequest,
  enabled = true
) => {
  return useQuery({
    queryKey: [APPLICATION_LIST_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.applications.list(params),
    enabled: !!params.offerId && enabled,
  });
};
