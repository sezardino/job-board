import { apiService } from "@/services/api";
import { CommonJobOffersRequest } from "@/services/bll/modules/job-offers/schema";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const COMMON_JOB_OFFERS_QUERY_KEY = "common-job-offers";

export const useCommonJobOffersQuery = (
  params: CommonJobOffersRequest & { id: string }
) => {
  return useQuery({
    queryKey: [COMMON_JOB_OFFERS_QUERY_KEY, ...Object.values(params)],
    queryFn: () => apiService.jobOffers.list(params),
    enabled: !!params.id,
  });
};

export const useCommonJobOffersInfiniteQuery = (
  params: CommonJobOffersRequest & { id: string }
) => {
  const query = useInfiniteQuery({
    queryKey: [COMMON_JOB_OFFERS_QUERY_KEY, ...Object.values(params)],
    queryFn: ({ pageParam }) =>
      apiService.jobOffers.commonJobOffers({ ...params, page: pageParam }),
    getNextPageParam: ({ meta }) => {
      return meta.page < meta.totalPages ? meta.page + 1 : undefined;
    },
    enabled: !!params.id,
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
