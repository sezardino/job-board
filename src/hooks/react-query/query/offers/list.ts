import { apiService } from "@/services/api";
import { OffersListRequest } from "@/services/server/modules/job-offers/scema";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const OFFERS_LIST_QUERY_KEY = "offers-list";

export const useOffersListQuery = (params: OffersListRequest) => {
  return useQuery({
    queryKey: [OFFERS_LIST_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.offers.list(params),
    enabled: !!params.industry,
  });
};

export const useOffersListInfiniteQuery = (params: OffersListRequest) => {
  const query = useInfiniteQuery({
    queryKey: [OFFERS_LIST_QUERY_KEY, ...Object.values(params)],
    queryFn: ({ pageParam }) =>
      apiService.offers.list({ ...params, page: pageParam }),
    getNextPageParam: ({ meta }) => {
      return meta.page < meta.totalPages ? meta.page + 1 : undefined;
    },
    enabled: !!params.industry,
    initialPageParam: 0,
  });

  return useMemo(
    () => ({
      ...query,
      data: {
        meta: query.data?.pages[query.data.pages.length - 1].meta || {
          totalPages: 0,
          page: 0,
          limit: 0,
          count: 0,
        },
        data: query.data?.pages.flatMap((page) => page.data) || [],
      },
    }),
    [query]
  );
};
