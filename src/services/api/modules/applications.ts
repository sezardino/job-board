import {
  ApplicationHistoryRequest,
  ApplyForOfferRequest,
  ChangeApplicationStatusRequest,
  applicationHistoryResponseSchema,
  applyForOfferResponseSchema,
} from "@/services/bll/modules/application/schema";
import {
  OfferApplicationsRequest,
  offerApplicationsResponseSchema,
} from "@/services/bll/modules/application/schema/list";
import {
  OfferApplicationsStatisticsRequest,
  offerApplicationsStatisticsResponseSchema,
} from "@/services/bll/modules/application/schema/offer-statistics";
import { oneApplicationResponseSchema } from "@/services/bll/modules/application/schema/one";
import { AbstractApiModule } from "../helpers";

export class ApplicationsApiModule extends AbstractApiModule {
  apply(data: ApplyForOfferRequest) {
    const formData = new FormData();

    for (const key in data) {
      // @ts-ignore
      formData.append(key, data[key]);
    }

    return this.fetch({
      endpoint: "applications",
      config: { method: "POST", data: formData },
      schema: applyForOfferResponseSchema,
    });
  }

  list(params: OfferApplicationsRequest) {
    return this.fetch({
      endpoint: `applications`,
      config: { method: "GET", params },
      schema: offerApplicationsResponseSchema,
    });
  }

  one(id: string) {
    return this.fetch({
      endpoint: `applications/${id}`,
      config: { method: "GET" },
      schema: oneApplicationResponseSchema,
    });
  }

  offerStatistics(params: OfferApplicationsStatisticsRequest) {
    return this.fetch({
      endpoint: `applications/statistics`,
      config: { method: "GET", params },
      schema: offerApplicationsStatisticsResponseSchema,
    });
  }

  changeStatus({
    applicationId,
    ...data
  }: ChangeApplicationStatusRequest & { applicationId: string }) {
    return this.fetch({
      endpoint: `applications/${applicationId}`,
      config: { method: "PATCH", data },
      schema: offerApplicationsStatisticsResponseSchema,
    });
  }

  history(params: ApplicationHistoryRequest) {
    return this.fetch({
      endpoint: "applications/history",
      config: { params },
      schema: applicationHistoryResponseSchema,
    });
  }
}
