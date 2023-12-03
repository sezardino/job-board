import { apiService } from "@/services/api";
import { CheckEmailAvailableRequest } from "@/services/server/modules/users/schema";
import { useMutationHelper } from "../../helpers";

export const useCheckEmailAvailableMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CheckEmailAvailableRequest) =>
      apiService.users.checkLoginAvailable(dto),
  });
