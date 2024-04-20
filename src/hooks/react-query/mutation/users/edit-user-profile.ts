import { apiService } from "@/services/api";
import { EditUserProfileRequest } from "@/services/bll/modules/users/schema";
import { useMutationHelper } from "../../helpers";

export const useEditUserProfileMutation = () =>
  useMutationHelper({
    mutationFn: (dto: EditUserProfileRequest) =>
      apiService.users.editProfile(dto),
    getQueriesToInvalidate: () => [],
  });
