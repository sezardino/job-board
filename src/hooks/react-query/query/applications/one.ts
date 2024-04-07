import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const ONE_APPLICATION_QUERY_KEY = "one-application";

export const useOneApplicationQuery = (id: string, enabled = true) =>
  useQuery({
    queryKey: [ONE_APPLICATION_QUERY_KEY, id],
    queryFn: () => apiService.applications.one(id),
    enabled: !!id && enabled,
  });
