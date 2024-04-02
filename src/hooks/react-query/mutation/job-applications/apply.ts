import { apiService } from "@/services/api";
import { ApplyForJobOfferRequest } from "@/services/bll/modules/job-application/schema";
import { useMutationHelper } from "../../helpers";

export const useApplyForJobOfferMutation = () =>
  useMutationHelper({
    mutationFn: (dto: ApplyForJobOfferRequest) =>
      apiService.jobApplications.apply(dto),
  });
