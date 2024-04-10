import { apiService } from "@/services/api";
import { CreateOfferRequest } from "@/services/bll/modules/offers/schema";
import { useMutationHelper } from "../../helpers";
import { CURRENT_COMPANY_OFFERS_QUERY_KEY } from "../../query/offers";

export const useCreateOfferMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CreateOfferRequest) => apiService.offers.create(dto),
    getQueriesToInvalidate: () => [[CURRENT_COMPANY_OFFERS_QUERY_KEY]],
  });
