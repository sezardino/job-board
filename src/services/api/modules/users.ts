import {
  IsEmailAvailableRequest,
  isEmailAvailableResponseSchema,
} from "@/services/server/modules/users/schema";
import {
  AdminsListRequest,
  adminsListResponseSchema,
} from "@/services/server/modules/users/schema/admins-list";
import { AbstractApiModule } from "../helpers";

export class UsersApiModule extends AbstractApiModule {
  async isLoginAvailable(params: IsEmailAvailableRequest) {
    return await this.fetch({
      endpoint: "users/is-login-available",
      config: { params },
      schema: isEmailAvailableResponseSchema,
    });
  }

  async adminsList(params: AdminsListRequest) {
    return await this.fetch({
      endpoint: "users/admins-list",
      config: { params },
      schema: adminsListResponseSchema,
    });
  }
}
