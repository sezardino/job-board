import { apiService } from "@/services/api";
import { InviteAdminRequest } from "@/services/bll/modules/users/schema/invite-admin";
import { ADMINS_USERS_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";

export const useInviteAdminMutation = () =>
  useMutationHelper({
    mutationFn: (data: InviteAdminRequest) =>
      apiService.users.inviteAdmin(data),
    getQueriesToInvalidate: () => [[ADMINS_USERS_QUERY_KEY]],
  });
