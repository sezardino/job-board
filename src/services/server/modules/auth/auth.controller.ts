import { NextRequest } from "next/server";
import { AbstractController } from "../../helpers";
import { AuthService } from "./auth.service";
import {
  CustomerRegistrationResponse,
  LoginRequest,
  LoginResponse,
  VerifyEmailTokenResponse,
  customerRegistrationRequestSchema,
  loginRequestSchema,
  verifyEmailTokenRequestSchema,
} from "./schema";
import {
  CompanyRegistrationResponse,
  companyRegistrationRequestSchema,
} from "./schema/company-registration";
import {
  ResendVerificationEmailResponse,
  resendVerificationEmailRequestSchema,
} from "./schema/resend-verification-email";

export class AuthController extends AbstractController<AuthService> {
  async customerRegistration(req: NextRequest) {
    const body = await req.json();
    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: customerRegistrationRequestSchema,
    });

    if (response) return response;

    try {
      const status = await this.service.customerRegistration(dto!);

      return this.getNextResponse(
        { status } as CustomerRegistrationResponse,
        201
      );
    } catch (error) {
      return this.getNextResponse(error as {}, 500);
    }
  }

  async companyRegistration(req: NextRequest) {
    const body = await req.json();
    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: companyRegistrationRequestSchema,
    });

    if (response) return response;

    try {
      const status = await this.service.companyRegistration(dto!);

      return this.getNextResponse(
        { status } as CompanyRegistrationResponse,
        201
      );
    } catch (error) {
      console.log(error);
      return this.getNextResponse(error as {}, 500);
    }
  }

  async verifyEmailToken(req: NextRequest) {
    const body = await req.json();

    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: verifyEmailTokenRequestSchema,
    });

    if (response) return response;

    try {
      const res = await this.service.verifyEmailToken(dto?.token!);

      return this.getNextResponse(
        { status: res } as VerifyEmailTokenResponse,
        200
      );
    } catch (error) {
      return this.getNextResponse(error as {}, 500);
    }
  }

  async login(body: LoginRequest) {
    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: loginRequestSchema,
    });

    if (response) throw new Error();

    try {
      const res = await this.service.login(dto!);

      if (typeof res === "string") return { status: res } as LoginResponse;

      return res as LoginResponse;
    } catch (error) {
      return null;
    }
  }

  async resendVerificationEmail(req: NextRequest) {
    const body = await req.json();

    const { response, dto } = await this.handlerHelper({
      data: body,
      schema: resendVerificationEmailRequestSchema,
    });

    if (response) return response;

    try {
      const res = await this.service.resendVerificationEmail(dto!);

      return this.getNextResponse(
        { status: res } as ResendVerificationEmailResponse,
        200
      );
    } catch (error) {
      return this.getNextResponse(error as {}, 500);
    }
  }
}
