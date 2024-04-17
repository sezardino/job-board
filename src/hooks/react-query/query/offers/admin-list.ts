import { apiService } from "@/services/api";
import { AdminOffersRequest } from "@/services/bll/modules/offers/schema";

import { useQuery } from "@tanstack/react-query";

export const ADMIN_OFFERS_LIST_QUERY_KEY = "admin-offers-list";

export const useAdminOffersListQuery = (params: AdminOffersRequest) => {
  return useQuery({
    queryKey: [ADMIN_OFFERS_LIST_QUERY_KEY, Object.values(params)],
    queryFn: () => apiService.offers.adminList(params),
  });
};
