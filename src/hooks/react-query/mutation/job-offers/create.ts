import { apiService } from "@/services/api";
import { CreateJobOfferRequest } from "@/services/bll/modules/job-offers/schema";
import { useMutationHelper } from "../../helpers";
import { CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY } from "../../query/job-offers";

export const useCreateJobOfferMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CreateJobOfferRequest) =>
      apiService.jobOffers.create(dto),
    getQueriesToInvalidate: () => [[CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY]],
  });
