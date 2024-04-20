import { apiService } from "@/services/api";
import { ResetPasswordRequestDto } from "@/services/bll/modules/auth/schema";
import { useMutationHelper } from "../../helpers";

export const useResetPasswordRequestMutation = () =>
  useMutationHelper({
    mutationFn: (dto: ResetPasswordRequestDto) =>
      apiService.auth.resetPasswordRequest(dto),
  });
