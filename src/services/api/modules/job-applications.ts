import {
  ApplyForJobOfferRequest,
  applyForJobOfferResponseSchema,
} from "@/services/bll/modules/job-application/schema";
import { AbstractApiModule } from "../helpers";

export class JobApplicationsApiModule extends AbstractApiModule {
  apply(data: ApplyForJobOfferRequest) {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    return this.fetch({
      endpoint: "job-applications",
      config: { method: "POST", data: formData },
      schema: applyForJobOfferResponseSchema,
    });
  }
}
