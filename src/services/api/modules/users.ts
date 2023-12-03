import {
  CheckEmailAvailableRequest,
  checkEmailAvailableResponseSchema,
} from "@/services/server/modules/users/schema";
import {
  AdminsListRequest,
  adminsListResponseSchema,
} from "@/services/server/modules/users/schema/admins-list";
import {
  InviteAdminRequest,
  inviteAdminResponseSchema,
} from "@/services/server/modules/users/schema/invite-admin";
import { AbstractApiModule } from "../helpers";

export class UsersApiModule extends AbstractApiModule {
  async checkLoginAvailable(params: CheckEmailAvailableRequest) {
    return await this.fetch({
      endpoint: "users/check-email-available",
      config: { params },
      schema: checkEmailAvailableResponseSchema,
    });
  }

  async adminsList(params: AdminsListRequest) {
    return await this.fetch({
      endpoint: "users/admins-list",
      config: { params },
      schema: adminsListResponseSchema,
    });
  }

  inviteAdmin(data: InviteAdminRequest) {
    return this.fetch({
      endpoint: "users/invite-admin",
      config: { method: "POST", data },
      schema: inviteAdminResponseSchema,
    });
  }
}
