import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const JOB_OFFER_EDITION_DATA = "job-offer-data-for-edition";

export const useJobOfferEditionDataQuery = (id?: string) => {
  return useQuery({
    queryKey: [JOB_OFFER_EDITION_DATA, id],
    queryFn: () => apiService.jobOffers.editionData(id!),
    enabled: !!id,
  });
};
