import { apiService } from "@/services/api";
import { ResetPasswordRequest } from "@/services/bll/modules/users/schema";
import { useMutationHelper } from "../../helpers";

export const useResetPasswordMutation = () =>
  useMutationHelper({
    mutationFn: (dto: ResetPasswordRequest) =>
      apiService.users.resetPassword(dto),
  });
