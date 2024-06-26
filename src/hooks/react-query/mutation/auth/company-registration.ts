import { apiService } from "@/services/api";
import { CompanyRegistrationRequest } from "@/services/bll/modules/auth/schema/company-registration";
import { useMutationHelper } from "../../helpers";

export const useCompanyRegistrationMutation = () =>
  useMutationHelper({
    mutationFn: (req: CompanyRegistrationRequest) =>
      apiService.auth.companyRegistration(req),
  });
