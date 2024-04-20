import { apiService } from "@/services/api";
import { ChangePasswordRequest } from "@/services/bll/modules/users/schema";
import { useMutationHelper } from "../../helpers";

export const useChangePasswordMutation = () =>
  useMutationHelper({
    mutationFn: (dto: ChangePasswordRequest) =>
      apiService.users.changePassword(dto),
  });
