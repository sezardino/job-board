import { apiService } from "@/services/api";
import { InviteUsersRequest } from "@/services/bll/modules/users/schema";
import { ADMINS_USERS_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";
import { COMPANY_USERS_QUERY_KEY } from "../../query/users/company";

export const useInviteUsersMutation = () =>
  useMutationHelper({
    mutationFn: (data: InviteUsersRequest) =>
      apiService.users.inviteUsers(data),
    getQueriesToInvalidate: () => [
      [ADMINS_USERS_QUERY_KEY],
      [COMPANY_USERS_QUERY_KEY],
    ],
  });
