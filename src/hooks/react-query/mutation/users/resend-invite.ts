import { apiService } from "@/services/api";
import { ADMINS_USERS_QUERY_KEY, COMPANIES_USERS_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";
import { COMPANY_USERS_QUERY_KEY } from "../../query/users/company";

export const useResendInviteMutation = () =>
  useMutationHelper({
    mutationFn: (id: string) => apiService.users.resendInvite(id),
    getQueriesToInvalidate: () => [
      [ADMINS_USERS_QUERY_KEY],
      [COMPANIES_USERS_QUERY_KEY],
      [COMPANY_USERS_QUERY_KEY],
    ],
  });
