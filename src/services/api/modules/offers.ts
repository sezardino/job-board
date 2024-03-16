import {
  CreateJobOfferRequest,
  OffersListRequest,
  createJobOfferResponseSchema,
  offersListResponseSchema,
  oneOfferResponseSchema,
} from "@/services/server/modules/job-offers/schema";
import {
  CurrentCompanyJobOffersRequest,
  currentCompanyJobOffersResponseSchema,
} from "@/services/server/modules/job-offers/schema/current-company";
import { AbstractApiModule } from "../helpers";

export class OffersApiModule extends AbstractApiModule {
  currentCompany(params: CurrentCompanyJobOffersRequest) {
    return this.fetch({
      endpoint: "job-offers/company",
      config: { params },
      schema: currentCompanyJobOffersResponseSchema,
    });
  }

  list(params: OffersListRequest) {
    return this.fetch({
      endpoint: "job-offers",
      config: { params },
      schema: offersListResponseSchema,
    });
  }

  one(id: string) {
    return this.fetch({
      endpoint: `job-offers/${id}`,
      schema: oneOfferResponseSchema,
    });
  }

  create(data: CreateJobOfferRequest) {
    return this.fetch({
      endpoint: "job-offers",
      schema: createJobOfferResponseSchema,
      config: { method: "POST", data },
    });
  }
}
