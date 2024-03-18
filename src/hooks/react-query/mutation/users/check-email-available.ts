import { apiService } from "@/services/api";
import { CheckEmailAvailableRequest } from "@/services/bll/modules/users/schema";
import { useMutationHelper } from "../../helpers";

export const useCheckEmailAvailableMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CheckEmailAvailableRequest) =>
      apiService.users.checkEmailAvailable(dto),
  });
