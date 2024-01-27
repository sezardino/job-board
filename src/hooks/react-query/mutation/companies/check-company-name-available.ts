import { apiService } from "@/services/api";
import { CheckCompanyNameAvailableRequest } from "@/services/server/modules/companies/schema";
import { useMutationHelper } from "../../helpers";

export const useCheckCompanyNameAvailableMutation = () =>
  useMutationHelper({
    mutationFn: (dto: CheckCompanyNameAvailableRequest) =>
      apiService.companies.checkNameAvailable(dto),
  });
