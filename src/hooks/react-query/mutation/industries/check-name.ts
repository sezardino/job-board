import { apiService } from "@/services/api";
import { CheckIndustryNameAvailableRequest } from "@/services/server/modules/industries/schema";
import { useMutationHelper } from "../../helpers";

export const useCheckIndustryNameAvailableMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CheckIndustryNameAvailableRequest) =>
      apiService.industries.checkName(dto),
  });
