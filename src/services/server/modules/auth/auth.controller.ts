import { NextRequest } from "next/server";
import { AbstractController } from "../../helpers";
import { AuthService } from "./auth.service";
import {
  CustomerRegistrationResponse,
  LoginRequest,
  customerRegistrationRequestSchema,
  loginRequestSchema,
} from "./schema";

export class AuthController extends AbstractController<AuthService> {
  async customerRegistration(req: NextRequest) {
    const body = await req.json();
    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: customerRegistrationRequestSchema,
    });

    if (response) return response;

    try {
      await this.service.customerRegistration(dto!);

      return this.getNextResponse({} as CustomerRegistrationResponse, 201);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async login(body: LoginRequest) {
    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: loginRequestSchema,
    });

    if (response) throw new Error();

    try {
      return await this.service.login(dto!);
    } catch (error) {
      return null;
    }
  }
}
