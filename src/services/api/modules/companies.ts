import {
  EditCompanyRequest,
  adminCompaniesResponseSchema,
  editCompanyResponseSchema,
  myCompanyResponseSchema,
} from "@/services/server/modules/companies/schema";
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

  async edit(data: EditCompanyRequest) {
    return await this.fetch({
      endpoint: "companies",
      schema: editCompanyResponseSchema,
      config: {
        method: "PUT",
        data,
      },
    });
  }

  async my() {
    return await this.fetch({
      endpoint: "companies",
      schema: myCompanyResponseSchema,
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
