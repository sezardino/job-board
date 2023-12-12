import {
  AdminUsersRequest,
  CheckEmailAvailableRequest,
  CheckEmailsAvailableRequest,
  CompaniesUsersRequest,
  CompanyUsersRequest,
  CustomerUsersRequest,
  InviteAdminRequest,
  InviteUsersRequest,
  adminUsersResponseSchema,
  checkEmailAvailableResponseSchema,
  checkEmailsAvailableResponseSchema,
  companiesUsersResponseSchema,
  companyUsersResponseSchema,
  customerUsersResponseSchema,
  inviteAdminResponseSchema,
  inviteUsersResponseSchema,
} from "@/services/server/modules/users/schema";
import { AbstractApiModule } from "../helpers";

export class UsersApiModule extends AbstractApiModule {
  async checkEmailAvailable(params: CheckEmailAvailableRequest) {
    return await this.fetch({
      endpoint: "users/check-email",
      config: { params },
      schema: checkEmailAvailableResponseSchema,
    });
  }

  async checkEmailsAvailable(data: CheckEmailsAvailableRequest) {
    return await this.fetch({
      endpoint: "users/check-emails",
      config: { method: "POST", data },
      schema: checkEmailsAvailableResponseSchema,
    });
  }

  async admins(params: AdminUsersRequest) {
    return await this.fetch({
      endpoint: "users/admin",
      config: { params },
      schema: adminUsersResponseSchema,
    });
  }

  inviteAdmin(data: InviteAdminRequest) {
    return this.fetch({
      endpoint: "users/admin/invite",
      config: { method: "POST", data },
      schema: inviteAdminResponseSchema,
    });
  }

  inviteUsers(data: InviteUsersRequest) {
    return this.fetch({
      endpoint: "users/invite",
      config: { method: "POST", data },
      schema: inviteUsersResponseSchema,
    });
  }

  companies(params: CompaniesUsersRequest) {
    return this.fetch({
      endpoint: "users/admin/companies",
      config: { params },
      schema: companiesUsersResponseSchema,
    });
  }

  customers(params: CustomerUsersRequest) {
    return this.fetch({
      endpoint: "users/admin/customers",
      config: { params },
      schema: customerUsersResponseSchema,
    });
  }

  company(params: CompanyUsersRequest) {
    return this.fetch({
      endpoint: "users/company",
      config: { params },
      schema: companyUsersResponseSchema,
    });
  }
}
