import {
  CheckCompanyNameAvailableRequest,
  EditCompanyRequest,
  adminCompaniesResponseSchema,
  checkCompanyNameAvailableResponseSchema,
  companyProfileResponseSchema,
  editCompanyResponseSchema,
  myCompanyBaseDataResponseSchema,
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
    const formData = new FormData();

    if (data.logo) formData.append("logo", data.logo);

    if (data.bio) formData.append("bio", data.bio);

    if (data.slogan) formData.append("slogan", data.slogan);

    if (data.gallery) {
      data.gallery.forEach((file: File) => {
        formData.append("gallery[]", file);
      });
    }

    if (data.galleryDeleted?.length) {
      data.galleryDeleted.forEach((id: string) => {
        formData.append("galleryDeleted[]", id);
      });
    }

    return await this.fetch({
      endpoint: "companies",
      schema: editCompanyResponseSchema,
      config: {
        method: "PUT",
        data: formData,
      },
    });
  }

  async myCompanyProfile() {
    return await this.fetch({
      endpoint: "companies",
      schema: companyProfileResponseSchema,
    });
  }

  async myCompanyBaseData() {
    return await this.fetch({
      endpoint: "companies/base",
      schema: myCompanyBaseDataResponseSchema,
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

  async checkNameAvailable(params: CheckCompanyNameAvailableRequest) {
    return await this.fetch({
      endpoint: "companies/check-name",
      config: { params },
      schema: checkCompanyNameAvailableResponseSchema,
    });
  }
}
