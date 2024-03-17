import {
  CurrentCompanyJobOffersRequest,
  currentCompanyJobOffersResponseSchema,
  OffersListRequest,
  offersListResponseSchema,
  oneOfferResponseSchema,
  CreateJobOfferRequest,
  createJobOfferResponseSchema,
} from "@/services/bll/modules/job-offers/schema";
import { AbstractApiModule } from "../helpers";

export class JobOffersApiModule extends AbstractApiModule {
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
