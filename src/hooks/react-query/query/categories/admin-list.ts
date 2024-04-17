import { apiService } from "@/services/api";
import { AdminCategoriesRequest } from "@/services/bll/modules/categories/schema";
import { useQuery } from "@tanstack/react-query";

export const ADMIN_CATEGORIES_LIST_QUERY_KEY = "admin-categories-list";

export const useAdminCategoriesListQuery = (params: AdminCategoriesRequest) => {
  return useQuery({
    queryKey: [ADMIN_CATEGORIES_LIST_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.categories.adminList(params),
  });
};
