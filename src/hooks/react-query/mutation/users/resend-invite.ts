import { apiService } from "@/services/api";
import { useMutationHelper } from "../../helpers";

export const useResendInviteMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) => apiService.users.resendInvite(id),
  });
