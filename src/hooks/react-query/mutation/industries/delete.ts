import { apiService } from "@/services/api";
import { ADMIN_INDUSTRIES_LIST_QUERY_KEY } from "../..";
import { useMutationHelper } from "../../helpers";

export const useDeleteIndustryMutation = () =>
  useMutationHelper({
    mutationFn: (industryId: string) =>
      apiService.industries.delete(industryId),
    getQueriesToInvalidate: () => [[ADMIN_INDUSTRIES_LIST_QUERY_KEY]],
  });
