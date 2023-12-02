import {
  AdminIndustriesListRequest,
  adminIndustriesListResponseSchema,
} from "@/services/server/modules/industries/schema/";
import { AbstractApiModule } from "../helpers";

export class IndustriesApiModule extends AbstractApiModule {
  async adminList(params: AdminIndustriesListRequest) {
    return await this.fetch({
      endpoint: "industries/admin-list",
      config: { params },
      schema: adminIndustriesListResponseSchema,
    });
  }
}
