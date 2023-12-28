import { apiService } from "@/services/api";
import { EditCompanyUserRequest } from "@/services/server/modules/users/schema";
import { useMutationHelper } from "../../helpers";
import { COMPANY_USERS_QUERY_KEY } from "../../query/users/company";

export const useEditCompanyUserMutation = () =>
  useMutationHelper({
    mutationFn: (dto: EditCompanyUserRequest) =>
      apiService.users.editCompanyUser(dto),
    getQueriesToInvalidate: () => [[COMPANY_USERS_QUERY_KEY]],
  });
