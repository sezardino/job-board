import {
  AdminIndustriesRequest,
  adminIndustriesResponseSchema,
} from "@/services/server/modules/industries/schema";
import { AbstractApiModule } from "../helpers";

export class IndustriesApiModule extends AbstractApiModule {
  async adminList(params: AdminIndustriesRequest) {
    return await this.fetch({
      endpoint: "industries/admin",
      config: { params },
      schema: adminIndustriesResponseSchema,
    });
  }
}
