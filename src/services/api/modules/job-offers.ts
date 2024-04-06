import {
  ChangeJobOfferStatusRequest,
  CommonJobOffersRequest,
  CreateJobOfferRequest,
  CurrentCompanyJobOffersRequest,
  OffersListRequest,
  PreviewJobOfferRequest,
  changeJobOfferStatusResponseSchema,
  commonJobOffersResponseSchema,
  createJobOfferResponseSchema,
  currentCompanyJobOffersResponseSchema,
  jobOfferEditionDataResponseSchema,
  offersListResponseSchema,
  previewJobOfferResponseSchema,
} from "@/services/bll/modules/job-offers/schema";
import { deleteJobOfferResponseSchema } from "@/services/bll/modules/job-offers/schema/delete";
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

  commonJobOffers({ id, ...params }: CommonJobOffersRequest & { id: string }) {
    return this.fetch({
      endpoint: `job-offers/${id}/common`,
      schema: commonJobOffersResponseSchema,
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

  changeStatus(data: ChangeJobOfferStatusRequest & { id: string }) {
    return this.fetch({
      endpoint: `job-offers/${data.id}/status`,
      config: { method: "PATCH", data },
      schema: changeJobOfferStatusResponseSchema,
    });
  }

  delete(id: string) {
    return this.fetch({
      endpoint: `job-offers/${id}`,
      config: { method: "DELETE" },
      schema: deleteJobOfferResponseSchema,
    });
  }
}
