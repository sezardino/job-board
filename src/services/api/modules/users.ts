import {
  AdminUsersRequest,
  CancelInviteRequest,
  ChangePasswordRequest,
  CheckEmailAvailableRequest,
  CompaniesUsersRequest,
  CompanyUsersRequest,
  CustomerUsersRequest,
  EditCompanyUserRequest,
  EditUserProfileRequest,
  InviteAdminRequest,
  InviteUsersRequest,
  ResendInviteRequest,
  adminUsersResponseSchema,
  cancelInviteResponseSchema,
  changePasswordResponseSchema,
  checkEmailAvailableResponseSchema,
  companiesUsersResponseSchema,
  companyUsersResponseSchema,
  customerUsersResponseSchema,
  editCompanyUserResponseSchema,
  editUserProfileRequestSchema,
  inviteAdminResponseSchema,
  inviteUsersResponseSchema,
  resendInviteResponseSchema,
} from "@/services/bll/modules/users/schema";
import { currentUserProfileResponseSchema } from "@/services/bll/modules/users/schema/current-user-profile";
import { AbstractApiModule } from "../helpers";

export class UsersApiModule extends AbstractApiModule {
  async currentUserProfile() {
    return await this.fetch({
      endpoint: "users/me",
      config: { method: "GET" },
      schema: currentUserProfileResponseSchema,
    });
  }

  async checkEmailAvailable(params: CheckEmailAvailableRequest) {
    return await this.fetch({
      endpoint: "users/check-email",
      config: { method: "GET", params },
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

  changePassword(data: ChangePasswordRequest) {
    return this.fetch({
      endpoint: "users/password",
      schema: changePasswordResponseSchema,
      config: { method: "PATCH", data },
    });
  }

  editProfile(data: EditUserProfileRequest) {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);

    if (typeof data.avatar !== "undefined")
      formData.append("avatar", data.avatar);

    return this.fetch({
      endpoint: "users/profile",
      schema: editUserProfileRequestSchema,
      config: { method: "PATCH", data: formData },
    });
  }
}
