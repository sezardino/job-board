import { apiService } from "@/services/api";
import { useMutationHelper } from "../../helpers";
import {
  OFFERS_FOR_MANAGE_QUERY,
  OFFERS_LIST_QUERY_KEY,
  PREVIEW_OFFER_QUERY_KEY,
} from "../../query/offers";

export const useDeleteOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) => apiService.offers.delete(id),
    getQueriesToInvalidate: ({ vars }) => [
      [OFFERS_FOR_MANAGE_QUERY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_OFFER_QUERY_KEY, vars],
    ],
  });
