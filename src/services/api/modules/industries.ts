import {
  AdminIndustriesRequest,
  CreateIndustryRequest,
  adminIndustriesResponseSchema,
  createIndustryRequestSchema,
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

  async create(data: CreateIndustryRequest) {
    return await this.fetch({
      endpoint: "industries",
      config: { method: "POST", data },
      schema: createIndustryRequestSchema,
    });
  }
}
