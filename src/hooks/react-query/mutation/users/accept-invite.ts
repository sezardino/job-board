import { apiService } from "@/services/api";
import { AcceptInviteRequest } from "@/services/bll/modules/users/schema";
import { useMutationHelper } from "../../helpers";

export const useAcceptInviteMutation = () =>
  useMutationHelper({
    mutationFn: (dto: AcceptInviteRequest) =>
      apiService.users.acceptInvite(dto),
  });
