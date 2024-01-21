import {
  CustomerRegistrationRequest,
  customerRegistrationResponseSchema,
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
}
