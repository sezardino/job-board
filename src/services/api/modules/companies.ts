import { adminCompaniesResponseSchema } from "@/services/server/modules/companies/schema";
import { AdminIndustriesRequest } from "@/services/server/modules/industries/schema";
import { AbstractApiModule } from "../helpers";

export class CompaniesApiModule extends AbstractApiModule {
  async admin(params: AdminIndustriesRequest) {
    return await this.fetch({
      endpoint: "companies/admin",
      config: { params },
      schema: adminCompaniesResponseSchema,
    });
  }

  async upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return await this.fetch({
      endpoint: "upload",
      schema: adminCompaniesResponseSchema,
      config: {
        method: "POST",
        data: formData,
      },
    });
  }
}
