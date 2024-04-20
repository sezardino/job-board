import { apiService } from "@/services/api";
import { useMutationHelper } from "../../helpers";
import { ResetPasswordRequest } from "@/services/bll/modules/auth/schema";

export const useResetPasswordMutation = () =>
  useMutationHelper({
    mutationFn: (dto: ResetPasswordRequest) =>
      apiService.auth.resetPassword(dto),
  });
