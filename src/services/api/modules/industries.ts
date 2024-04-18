import {
  AdminIndustriesRequest,
  CheckIndustryNameAvailableRequest,
  CreateIndustryRequest,
  UpdateIndustryRequest,
  activeIndustriesResponseSchema,
  adminIndustriesResponseSchema,
  checkIndustryNameAvailableResponseSchema,
  createIndustryRequestSchema,
  deleteIndustryResponseSchema,
  updateIndustryRequestSchema,
} from "@/services/bll/modules/industries/schema";
import { baseIndustryDataResponseSchema } from "@/services/bll/modules/industries/schema/base";
import { AbstractApiModule } from "../helpers";

export class IndustriesApiModule extends AbstractApiModule {
  async adminList(params: AdminIndustriesRequest) {
    return await this.fetch({
      endpoint: "industries/admin",
      config: { params },
      schema: adminIndustriesResponseSchema,
    });
  }

  async baseData(id: string) {
    return await this.fetch({
      endpoint: `industries/${id}`,
      schema: baseIndustryDataResponseSchema,
    });
  }

  async create(data: CreateIndustryRequest) {
    return await this.fetch({
      endpoint: "industries",
      config: { method: "POST", data },
      schema: createIndustryRequestSchema,
    });
  }

  async delete(industryId: string) {
    return await this.fetch({
      endpoint: `industries`,
      config: { method: "DELETE", data: { id: industryId } },
      schema: deleteIndustryResponseSchema,
    });
  }

  async update(data: UpdateIndustryRequest) {
    return await this.fetch({
      endpoint: `industries`,
      config: { method: "PATCH", data },
      schema: updateIndustryRequestSchema,
    });
  }

  async checkName(params: CheckIndustryNameAvailableRequest) {
    return await this.fetch({
      endpoint: "industries/check-name",
      config: { params },
      schema: checkIndustryNameAvailableResponseSchema,
    });
  }

  async activeIndustries() {
    return await this.fetch({
      endpoint: "industries",
      schema: activeIndustriesResponseSchema,
    });
  }
}
