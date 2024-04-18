import { apiService } from "@/services/api";
import { OfferStatus } from "@prisma/client";
import { useMutationHelper } from "../../helpers";
import {
  OFFERS_FOR_MANAGE_QUERY,
  OFFERS_LIST_QUERY_KEY,
  PREVIEW_OFFER_QUERY_KEY,
} from "../../query/offers";

export const usePublishOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) =>
      apiService.offers.changeStatus({ id, status: OfferStatus.ACTIVE }),
    getQueriesToInvalidate: ({ vars }) => [
      [OFFERS_FOR_MANAGE_QUERY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_OFFER_QUERY_KEY, vars],
    ],
  });

export const useUnpublishOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) =>
      apiService.offers.changeStatus({ id, status: OfferStatus.DRAFT }),
    getQueriesToInvalidate: ({ vars }) => [
      [OFFERS_FOR_MANAGE_QUERY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_OFFER_QUERY_KEY, vars],
    ],
  });

export const useFinishOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) =>
      apiService.offers.changeStatus({
        id,
        status: OfferStatus.FINISHED,
      }),
    getQueriesToInvalidate: ({ vars }) => [
      [OFFERS_FOR_MANAGE_QUERY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_OFFER_QUERY_KEY, vars],
    ],
  });

export const useArchiveOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) =>
      apiService.offers.changeStatus({
        id,
        status: OfferStatus.ARCHIVED,
      }),
    getQueriesToInvalidate: ({ vars }) => [
      [OFFERS_FOR_MANAGE_QUERY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_OFFER_QUERY_KEY, vars],
    ],
  });
