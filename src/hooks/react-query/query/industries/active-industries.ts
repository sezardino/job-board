import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const ACTIVE_INDUSTRIES_QUERY_KEY = "active-industries";

export const useActiveIndustriesQuery = () =>
  useQuery({
    queryKey: [ACTIVE_INDUSTRIES_QUERY_KEY],
    queryFn: () => apiService.industries.activeIndustries(),
  });
