import { apiService } from "@/services/api";
import { EditCompanyRequest } from "@/services/bll/modules/companies/schema";
import { MY_COMPANY_PROFILE_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";

export const useEditMyCompanyMutation = () =>
  useMutationHelper({
    mutationFn: (data: EditCompanyRequest) => apiService.companies.edit(data),
    getQueriesToInvalidate: () => [[MY_COMPANY_PROFILE_QUERY_KEY]],
  });
