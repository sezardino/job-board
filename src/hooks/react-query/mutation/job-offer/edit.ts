import { apiService } from "@/services/api";
import { EditJobOfferRequest } from "@/services/bll/modules/job-offers/schema/edit";
import { useMutationHelper } from "../../helpers";
import { JOB_OFFER_EDITION_DATA } from "../../query/job-offers/data-for-edition";

export const useEditJobOfferMutation = () =>
  useMutationHelper({
    mutationFn: (dto: EditJobOfferRequest & { id: string }) =>
      apiService.jobOffers.edit(dto),
    getQueriesToInvalidate: () => [[JOB_OFFER_EDITION_DATA]],
  });
