import { apiService } from "@/services/api";
import { CreateJobOfferRequest } from "@/services/server/modules/job-offers/schema";
import { useMutationHelper } from "../../helpers";
import { CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY } from "../../query/offers";

export const useCreateJobOfferMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CreateJobOfferRequest) => apiService.offers.create(dto),
    getQueriesToInvalidate: () => [[CURRENT_COMPANY_JOB_OFFERS_QUERY_KEY]],
  });
