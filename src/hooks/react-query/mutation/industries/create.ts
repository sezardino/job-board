import { apiService } from "@/services/api";
import { CreateIndustryRequest } from "@/services/server/modules/industries/schema";
import { ADMIN_INDUSTRIES_LIST_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";

export const useCreateIndustryMutation = () =>
  useMutationHelper({
    mutationFn: (data: CreateIndustryRequest) =>
      apiService.industries.create(data),
    getQueriesToInvalidate: () => [[ADMIN_INDUSTRIES_LIST_QUERY_KEY]],
  });
