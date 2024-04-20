import {
  CustomerRegistrationRequest,
  ResendVerificationEmailRequest,
  ResetPasswordRequest,
  ResetPasswordRequestDto,
  VerifyResetPasswordTokenRequest,
  customerRegistrationResponseSchema,
  resendVerificationEmailResponseSchema,
  resetPasswordRequestResponseSchema,
  resetPasswordResponseSchema,
  verifyEmailTokenResponseSchema,
  verifyResetPasswordTokenResponseSchema,
} from "@/services/bll/modules/auth/schema";
import {
  CompanyRegistrationRequest,
  companyRegistrationResponseSchema,
} from "@/services/bll/modules/auth/schema/company-registration";
import { AbstractApiModule } from "../helpers";

export class AuthApiModule extends AbstractApiModule {
  async customerRegistration(data: CustomerRegistrationRequest) {
    return await this.fetch({
      endpoint: "auth/registration",
      config: { data, method: "POST" },
      schema: customerRegistrationResponseSchema,
    });
  }

  async companyRegistration(data: CompanyRegistrationRequest) {
    return await this.fetch({
      endpoint: "auth/registration/company",
      config: { data, method: "POST" },
      schema: companyRegistrationResponseSchema,
    });
  }

  async verifyEmailToken(token: string) {
    return await this.fetch({
      endpoint: "auth/verify-email",
      config: { data: { token }, method: "POST" },
      schema: verifyEmailTokenResponseSchema,
    });
  }

  async resendVerifyEmail(data: ResendVerificationEmailRequest) {
    return await this.fetch({
      endpoint: "auth/verify-email/resend",
      config: { data, method: "POST" },
      schema: resendVerificationEmailResponseSchema,
    });
  }

  resetPasswordRequest(data: ResetPasswordRequestDto) {
    return this.fetch({
      endpoint: "auth/reset-password",
      schema: resetPasswordRequestResponseSchema,
      config: { method: "POST", data },
    });
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.fetch({
      endpoint: "auth/reset-password",
      schema: resetPasswordResponseSchema,
      config: { method: "POST", data },
    });
  }

  verifyResetPasswordToken(params: VerifyResetPasswordTokenRequest) {
    return this.fetch({
      endpoint: "auth/reset-password",
      schema: verifyResetPasswordTokenResponseSchema,
      config: { params },
    });
  }
}
