import {
  AdminUsersRequest,
  CheckEmailAvailableRequest,
  CompaniesUsersRequest,
  CustomerUsersRequest,
  InviteAdminRequest,
  adminUsersResponseSchema,
  checkEmailAvailableResponseSchema,
  companiesUsersResponseSchema,
  customerUsersResponseSchema,
  inviteAdminResponseSchema,
} from "@/services/server/modules/users/schema";
import { AbstractApiModule } from "../helpers";

export class UsersApiModule extends AbstractApiModule {
  async checkLoginAvailable(params: CheckEmailAvailableRequest) {
    return await this.fetch({
      endpoint: "users/check-email",
      config: { params },
      schema: checkEmailAvailableResponseSchema,
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
      endpoint: "users/invite-admin",
      config: { method: "POST", data },
      schema: inviteAdminResponseSchema,
    });
  }

  companies(params: CompaniesUsersRequest) {
    return this.fetch({
      endpoint: "users/company",
      config: { params },
      schema: companiesUsersResponseSchema,
    });
  }

  customers(params: CustomerUsersRequest) {
    return this.fetch({
      endpoint: "users/customer",
      config: { params },
      schema: customerUsersResponseSchema,
    });
  }

  company() {}
}
