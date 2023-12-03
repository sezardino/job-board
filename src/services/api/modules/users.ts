import {
  AdminUsersRequest,
  adminUsersResponseSchema,
  CheckEmailAvailableRequest,
  checkEmailAvailableResponseSchema,
  CompanyUsersRequest,
  companyUsersResponseSchema,
  CustomerUsersRequest,
  customerUsersResponseSchema,
  InviteAdminRequest,
  inviteAdminResponseSchema,
} from "@/services/server/modules/users/schema";
import { AbstractApiModule } from "../helpers";

export class UsersApiModule extends AbstractApiModule {
  async checkLoginAvailable(params: CheckEmailAvailableRequest) {
    return await this.fetch({
      endpoint: "users/check-email-available",
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

  companies(params: CompanyUsersRequest) {
    return this.fetch({
      endpoint: "users/company",
      config: { params },
      schema: companyUsersResponseSchema,
    });
  }

  customers(params: CustomerUsersRequest) {
    return this.fetch({
      endpoint: "users/customer",
      config: { params },
      schema: customerUsersResponseSchema,
    });
  }
}
