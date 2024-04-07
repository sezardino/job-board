import { apiService } from "@/services/api";
import { ApplyForOfferRequest } from "@/services/bll/modules/application/schema";
import { useMutationHelper } from "../../helpers";

export const useApplyForOfferMutation = () =>
  useMutationHelper({
    mutationFn: (dto: ApplyForOfferRequest) =>
      apiService.applications.apply(dto),
  });
