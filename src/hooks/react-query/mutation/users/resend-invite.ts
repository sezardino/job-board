import { apiService } from "@/services/api";
import { CancelInviteRequest } from "@/services/server/modules/users/schema";
import { ADMINS_USERS_QUERY_KEY, COMPANIES_USERS_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";
import { COMPANY_USERS_QUERY_KEY } from "../../query/users/company";

export const useResendInviteMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CancelInviteRequest) =>
      apiService.users.resendInvite(dto),
    getQueriesToInvalidate: () => [
      [ADMINS_USERS_QUERY_KEY],
      [COMPANIES_USERS_QUERY_KEY],
      [COMPANY_USERS_QUERY_KEY],
    ],
  });
