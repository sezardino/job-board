import {
  AdminIndustriesRequest,
  CheckIndustryNameAvailableRequest,
  CreateIndustryRequest,
  adminIndustriesResponseSchema,
  checkIndustryNameAvailableResponseSchema,
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

  async checkName(params: CheckIndustryNameAvailableRequest) {
    return await this.fetch({
      endpoint: "industries/check-name",
      config: { params },
      schema: checkIndustryNameAvailableResponseSchema,
    });
  }
}
