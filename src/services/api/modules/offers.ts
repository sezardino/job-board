import {
  ChangeOfferStatusRequest,
  CommonOffersRequest,
  CreateOfferRequest,
  CurrentCompanyOffersRequest,
  OfferBasicDataRequest,
  OffersListRequest,
  PreviewOfferRequest,
  changeOfferStatusResponseSchema,
  commonOffersResponseSchema,
  createOfferResponseSchema,
  currentCompanyOffersResponseSchema,
  offerBasicDataResponseSchema,
  offerEditionDataResponseSchema,
  offersListResponseSchema,
  previewOfferResponseSchema,
} from "@/services/bll/modules/offers/schema";
import { deleteOfferResponseSchema } from "@/services/bll/modules/offers/schema/delete";
import {
  EditOfferRequest,
  editOfferResponseSchema,
} from "@/services/bll/modules/offers/schema/edit";
import { AbstractApiModule } from "../helpers";

export class OffersApiModule extends AbstractApiModule {
  currentCompany(params: CurrentCompanyOffersRequest) {
    return this.fetch({
      endpoint: "offers/company",
      config: { params },
      schema: currentCompanyOffersResponseSchema,
    });
  }

  list(params: OffersListRequest) {
    return this.fetch({
      endpoint: "offers",
      config: { params },
      schema: offersListResponseSchema,
    });
  }

  one({ id, ...params }: PreviewOfferRequest & { id: string }) {
    return this.fetch({
      endpoint: `offers/${id}`,
      schema: previewOfferResponseSchema,
      config: { params },
    });
  }

  basicData({
    offerId,
    ...params
  }: OfferBasicDataRequest & { offerId: string }) {
    return this.fetch({
      endpoint: `offers/${offerId}/basic`,
      config: { params },
      schema: offerBasicDataResponseSchema,
    });
  }

  commonOffers({ id, ...params }: CommonOffersRequest & { id: string }) {
    return this.fetch({
      endpoint: `offers/${id}/common`,
      schema: commonOffersResponseSchema,
      config: { params },
    });
  }

  create(data: CreateOfferRequest) {
    return this.fetch({
      endpoint: "offers",
      schema: createOfferResponseSchema,
      config: { method: "POST", data },
    });
  }

  edit({ id, ...data }: EditOfferRequest & { id: string }) {
    return this.fetch({
      endpoint: `offers/${id}`,
      schema: editOfferResponseSchema,
      config: { method: "PATCH", data },
    });
  }

  editionData(id: string) {
    return this.fetch({
      endpoint: `offers/${id}/edition`,
      schema: offerEditionDataResponseSchema,
    });
  }

  changeStatus(data: ChangeOfferStatusRequest & { id: string }) {
    return this.fetch({
      endpoint: `offers/${data.id}/status`,
      config: { method: "PATCH", data },
      schema: changeOfferStatusResponseSchema,
    });
  }

  delete(id: string) {
    return this.fetch({
      endpoint: `offers/${id}`,
      config: { method: "DELETE" },
      schema: deleteOfferResponseSchema,
    });
  }
}
