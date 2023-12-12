import { apiService } from "@/services/api";
import { useMutationHelper } from "../../helpers";
import { CheckEmailsAvailableRequest } from "@/services/server/modules/users/schema";

export const useCheckEmailsAvailableMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CheckEmailsAvailableRequest) =>
      apiService.users.checkEmailsAvailable(dto),
  });
