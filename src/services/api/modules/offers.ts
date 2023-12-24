import {
  CompanyOffersRequest,
  companyOffersResponseSchema,
} from "@/services/server/modules/job-offers/scema/company-offers";
import { AbstractApiModule } from "../helpers";

export class OffersApiModule extends AbstractApiModule {
  myCompany(params: CompanyOffersRequest & { companyId: string }) {
    const { companyId, ...rest } = params;

    return this.fetch({
      endpoint: `offers/company/${companyId}`,
      config: { params: rest },
      schema: companyOffersResponseSchema,
    });
  }
}
