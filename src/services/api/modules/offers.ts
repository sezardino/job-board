import {
  MyCompanyOffersRequest,
  myCompanyOffersResponseSchema,
} from "@/services/server/modules/job-offers/scema/my-company-offers";
import { AbstractApiModule } from "../helpers";

export class OffersApiModule extends AbstractApiModule {
  myCompany(params: MyCompanyOffersRequest) {
    return this.fetch({
      endpoint: "offers/company",
      config: { params },
      schema: myCompanyOffersResponseSchema,
    });
  }
}
