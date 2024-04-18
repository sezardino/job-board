import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const BASE_CATEGORY_DATA_QUERY_KEY = "adminIndustriesList";

export const useBaseCategoryDataQuery = (id: string) => {
  return useQuery({
    queryKey: [BASE_CATEGORY_DATA_QUERY_KEY, id],
    queryFn: () => apiService.industries.baseData(id),
    enabled: !!id,
  });
};
