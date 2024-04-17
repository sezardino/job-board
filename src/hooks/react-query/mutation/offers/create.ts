import { apiService } from "@/services/api";
import { CreateOfferRequest } from "@/services/bll/modules/offers/schema";
import { useMutationHelper } from "../../helpers";
import { OFFERS_FOR_MANAGE_QUERY } from "../../query/offers";

export const useCreateOfferMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CreateOfferRequest) => apiService.offers.create(dto),
    getQueriesToInvalidate: () => [[OFFERS_FOR_MANAGE_QUERY]],
  });
