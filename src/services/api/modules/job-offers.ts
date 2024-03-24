import {
  CreateJobOfferRequest,
  CurrentCompanyJobOffersRequest,
  OffersListRequest,
  PreviewJobOfferRequest,
  createJobOfferResponseSchema,
  currentCompanyJobOffersResponseSchema,
  jobOfferEditionDataResponseSchema,
  offersListResponseSchema,
  previewJobOfferResponseSchema,
} from "@/services/bll/modules/job-offers/schema";
import {
  EditJobOfferRequest,
  editJobOfferResponseSchema,
} from "@/services/bll/modules/job-offers/schema/edit";
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

  one({ id, ...params }: PreviewJobOfferRequest & { id: string }) {
    return this.fetch({
      endpoint: `job-offers/${id}`,
      schema: previewJobOfferResponseSchema,
      config: { params },
    });
  }

  create(data: CreateJobOfferRequest) {
    return this.fetch({
      endpoint: "job-offers",
      schema: createJobOfferResponseSchema,
      config: { method: "POST", data },
    });
  }

  edit({ id, ...data }: EditJobOfferRequest & { id: string }) {
    return this.fetch({
      endpoint: `job-offers/${id}`,
      schema: editJobOfferResponseSchema,
      config: { method: "PATCH", data },
    });
  }

  editionData(id: string) {
    return this.fetch({
      endpoint: `job-offers/${id}/edition`,
      schema: jobOfferEditionDataResponseSchema,
    });
  }
}
