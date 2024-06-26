import { apiService } from "@/services/api";
import { CustomerRegistrationRequest } from "@/services/bll/modules/auth/schema";
import { useMutationHelper } from "../../helpers";

export const useCustomerRegistrationMutation = () =>
  useMutationHelper({
    mutationFn: (req: CustomerRegistrationRequest) =>
      apiService.auth.customerRegistration(req),
  });
