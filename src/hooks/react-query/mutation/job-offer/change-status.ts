import { apiService } from "@/services/api";
import { JobOfferStatus } from "@prisma/client";
import { useMutationHelper } from "../../helpers";
import {
  CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY,
  OFFERS_LIST_QUERY_KEY,
  PREVIEW_JOB_OFFER_QUERY_KEY,
} from "../../query/job-offers";

export const usePublishJobOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) =>
      apiService.jobOffers.changeStatus({ id, status: JobOfferStatus.ACTIVE }),
    getQueriesToInvalidate: ({ vars }) => [
      [CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_JOB_OFFER_QUERY_KEY, vars],
    ],
  });

export const useFinishJobOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) =>
      apiService.jobOffers.changeStatus({
        id,
        status: JobOfferStatus.FINISHED,
      }),
    getQueriesToInvalidate: ({ vars }) => [
      [CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_JOB_OFFER_QUERY_KEY, vars],
    ],
  });

export const useArchiveJobOfferMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) =>
      apiService.jobOffers.changeStatus({
        id,
        status: JobOfferStatus.ARCHIVED,
      }),
    getQueriesToInvalidate: ({ vars }) => [
      [CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY],
      [OFFERS_LIST_QUERY_KEY],
      [PREVIEW_JOB_OFFER_QUERY_KEY, vars],
    ],
  });
