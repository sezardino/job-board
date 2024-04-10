import { apiService } from "@/services/api";
import { EditOfferRequest } from "@/services/bll/modules/offers/schema/edit";
import { useMutationHelper } from "../../helpers";
import { OFFER_EDITION_DATA } from "../../query/offers/data-for-edition";

export const useEditOfferMutation = () =>
  useMutationHelper({
    mutationFn: (dto: EditOfferRequest & { id: string }) =>
      apiService.offers.edit(dto),
    getQueriesToInvalidate: () => [[OFFER_EDITION_DATA]],
  });
