import { NextRequest } from "next/server";
import { AbstractController } from "../../helpers";
import { AuthService } from "./auth.service";
import {
  LoginRequest,
  loginRequestSchema,
  registrationRequestSchema,
} from "./schema";

export class AuthController extends AbstractController<AuthService> {
  async registration(req: NextRequest) {
    const body = await req.json();
    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: registrationRequestSchema,
    });

    if (response) return response;

    try {
      const bllResponse = await this.service.registration(dto!);

      return this.getNextResponse({ success: bllResponse }, 201);
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
