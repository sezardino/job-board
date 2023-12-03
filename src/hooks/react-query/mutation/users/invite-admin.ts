import { apiService } from "@/services/api";
import { InviteAdminRequest } from "@/services/server/modules/users/schema/invite-admin";
import { ADMINS_LIST_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";

export const useInviteAdminMutation = () =>
  useMutationHelper({
    mutationFn: (data: InviteAdminRequest) =>
      apiService.users.inviteAdmin(data),
    getQueriesToInvalidate: () => [[ADMINS_LIST_QUERY_KEY]],
  });
