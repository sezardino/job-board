import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const ACTIVE_CATEGORIES_QUERY_KEY = "active-categories";

export const useActiveCategoriesQuery = (industryId?: string) =>
  useQuery({
    queryKey: [ACTIVE_CATEGORIES_QUERY_KEY, industryId],
    queryFn: () => apiService.categories.activeCategories(industryId!),
    enabled: !!industryId,
  });
