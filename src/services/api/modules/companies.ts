import { adminCompaniesListResponseSchema } from "@/services/server/modules/companies/schema/admin-list";
import { AdminIndustriesListRequest } from "@/services/server/modules/industries/schema/";
import { AbstractApiModule } from "../helpers";

export class CompaniesApiModule extends AbstractApiModule {
  async adminList(params: AdminIndustriesListRequest) {
    return await this.fetch({
      endpoint: "companies/admin-list",
      config: { params },
      schema: adminCompaniesListResponseSchema,
    });
  }
}
