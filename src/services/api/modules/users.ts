import {
  AdminUsersRequest,
  CancelInviteRequest,
  CheckEmailsAvailableRequest,
  CompaniesUsersRequest,
  CompanyUsersRequest,
  CustomerUsersRequest,
  EditCompanyUserRequest,
  InviteAdminRequest,
  InviteUsersRequest,
  ResendInviteRequest,
  adminUsersResponseSchema,
  cancelInviteResponseSchema,
  checkEmailsAvailableResponseSchema,
  companiesUsersResponseSchema,
  companyUsersResponseSchema,
  customerUsersResponseSchema,
  editCompanyUserResponseSchema,
  inviteAdminResponseSchema,
  inviteUsersResponseSchema,
  resendInviteResponseSchema,
} from "@/services/bll/modules/users/schema";
import { AbstractApiModule } from "../helpers";

export class UsersApiModule extends AbstractApiModule {
  async checkEmailsAvailable(data: CheckEmailsAvailableRequest) {
    return await this.fetch({
      endpoint: "users/check-email",
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

  resendInvite(data: ResendInviteRequest) {
    return this.fetch({
      endpoint: "users/invite",
      config: { method: "PATCH", data },
      schema: resendInviteResponseSchema,
    });
  }

  cancelInvite(data: CancelInviteRequest) {
    return this.fetch({
      endpoint: "users/invite",
      config: { method: "DELETE", data },
      schema: cancelInviteResponseSchema,
    });
  }

  editCompanyUser(data: EditCompanyUserRequest) {
    return this.fetch({
      endpoint: "users/company/edit",
      config: { method: "POST", data },
      schema: editCompanyUserResponseSchema,
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
