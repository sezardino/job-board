import { apiService } from "@/services/api";
import { ApplicationHistoryRequest } from "@/services/bll/modules/application/schema";
import { useQuery } from "@tanstack/react-query";

export const APPLICATIONS_HISTORY_LIST_QUERY_KEY = "applications-history-list";

export const useApplicationsHistoryQuery = (
  params: ApplicationHistoryRequest,
  enabled = true
) => {
  return useQuery({
    queryKey: [APPLICATIONS_HISTORY_LIST_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.applications.history(params),
    enabled,
  });
};
