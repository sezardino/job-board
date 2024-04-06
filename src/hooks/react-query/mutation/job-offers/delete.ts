import { apiService } from "@/services/api";
import { useMutationHelper } from "../../helpers";
import {
  CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY,
  OFFERS_LIST_QUERY_KEY,
  PREVIEW_JOB_OFFER_QUERY_KEY,
} from "../../query/job-offers";

export const useDeleteJobOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) => apiService.jobOffers.delete(id),
    getQueriesToInvalidate: ({ vars }) => [
      [CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_JOB_OFFER_QUERY_KEY, vars],
    ],
  });
