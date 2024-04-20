import { apiService } from "@/services/api";
import { EditUserProfileRequest } from "@/services/bll/modules/users/schema";
import { useMutationHelper } from "../../helpers";
import { CURRENT_USER_PROFILE_QUERY_KEY } from "../../query/users/current-user";

export const useEditUserProfileMutation = () =>
  useMutationHelper({
    mutationFn: (dto: EditUserProfileRequest) =>
      apiService.users.editProfile(dto),
    getQueriesToInvalidate: () => [[CURRENT_USER_PROFILE_QUERY_KEY]],
  });
