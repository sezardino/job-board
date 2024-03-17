import { apiService } from "@/services/api";
import { UpdateIndustryRequest } from "@/services/bll/modules/industries/schema";
import { ADMIN_INDUSTRIES_LIST_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";

export const useUpdateIndustryMutation = () =>
  useMutationHelper({
    mutationFn: (data: UpdateIndustryRequest) =>
      apiService.industries.update(data),
    getQueriesToInvalidate: () => [[ADMIN_INDUSTRIES_LIST_QUERY_KEY]],
  });
