import {
  IsEmailAvailableRequest,
  isEmailAvailableResponseSchema,
} from "@/services/server/modules/users/schema";
import { AbstractApiModule } from "../helpers";

export class UsersApiModule extends AbstractApiModule {
  async isLoginAvailable(params: IsEmailAvailableRequest) {
    return await this.fetch({
      endpoint: "users/is-login-available",
      config: { params },
      schema: isEmailAvailableResponseSchema,
    });
  }
}
