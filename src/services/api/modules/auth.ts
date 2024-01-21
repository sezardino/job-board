import {
  CustomerRegistrationRequest,
  customerRegistrationResponseSchema,
  verifyEmailTokenResponseSchema,
} from "@/services/server/modules/auth/schema";
import { AbstractApiModule } from "../helpers";

export class AuthApiModule extends AbstractApiModule {
  async registration(data: CustomerRegistrationRequest) {
    return await this.fetch({
      endpoint: "auth/registration",
      config: { data, method: "POST" },
      schema: customerRegistrationResponseSchema,
    });
  }

  async verifyEmailToken(token: string) {
    return await this.fetch({
      endpoint: "auth/verify-email",
      config: { data: { token }, method: "POST" },
      schema: verifyEmailTokenResponseSchema,
    });
  }
}
