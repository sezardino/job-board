import { JWTError } from "@/libs/jwt";
import { PrismaService } from "@/libs/prisma";
import { hashService } from "@/services/hash";
import { mailService } from "@/services/mail";
import {
  emailVerificationTokenService,
  passwordResetTokenService,
} from "@/services/token";
import { BadRequestException, NotFoundException } from "@/types";
import { UserStatus } from "@prisma/client";
import { TokenExpiredError } from "jsonwebtoken";
import { CompaniesBllModule, UsersBllModule } from "..";
import { AbstractBllService } from "../../module.abstract";
import {
  CustomerRegistrationRequest,
  LoginRequest,
  LoginStatus,
  RegistrationStatus,
  ResetPasswordRequest,
  ResetPasswordRequestDto,
  ResetPasswordRequestError,
  VerifyEmailTokenResponse,
  VerifyEmailTokenStatus,
} from "./schema";
import {
  CompanyRegistrationRequest,
  CompanyRegistrationStatus,
} from "./schema/company-registration";
import { ResendVerificationEmailStatus } from "./schema/resend-verification-email";
import {
  VerifyResetPasswordTokenErrors,
  VerifyResetPasswordTokenRequest,
} from "./schema/verify-reset-password-token";

export class AuthBllModule extends AbstractBllService {
  constructor(
    prismaService: PrismaService,
    private readonly usersService: UsersBllModule,
    private readonly companiesService: CompaniesBllModule
  ) {
    super(prismaService);
  }

  async sendWelcomeEmail(email: string, name: string, token: string) {
    await mailService.sendMail({
      to: email,
      templateKey: "welcomeTemplate",
      data: {
        name,
        token,
      },
    });
  }

  async customerRegistration(
    dto: CustomerRegistrationRequest
  ): Promise<RegistrationStatus> {
    const { email, password, name } = dto;

    const user = await this.usersService.checkEmailAvailable({ email });

    if (user && user.emailVerified) return RegistrationStatus.EmailUsed;
    if (user && !user.emailVerified)
      return RegistrationStatus.WaitingForEmailConfirmation;

    const newUserData = await this.usersService.registerCustomer({
      name,
      email,
      password,
    });

    await this.sendWelcomeEmail(email, name, newUserData.emailToken);

    return RegistrationStatus.Success;
  }

  async companyRegistration(
    dto: CompanyRegistrationRequest
  ): Promise<CompanyRegistrationStatus> {
    const { owner, company } = dto;
    const userResponse = await this.usersService.checkEmailAvailable({
      email: owner.email,
    });
    const companyResponse = await this.companiesService.checkNameAvailable(
      company.name
    );

    if (companyResponse) return CompanyRegistrationStatus.CompanyEmailUsed;
    if (userResponse && userResponse.emailVerified)
      return CompanyRegistrationStatus.EmailUsed;
    if (userResponse && !userResponse.emailVerified)
      return CompanyRegistrationStatus.WaitingForEmailConfirmation;

    const newCompany = await this.companiesService.createNewCompany(dto);

    await this.sendWelcomeEmail(
      newCompany.email,
      newCompany.name,
      newCompany.emailToken!
    );
    return CompanyRegistrationStatus.Success;
  }

  async resendVerificationEmailByEmail(email: string) {
    const user = await this.usersService.findUnique(
      { email: email },
      { email: true, emailVerified: true, name: true }
    );

    if (!user) return ResendVerificationEmailStatus.NotFound;
    if (user.emailVerified)
      return ResendVerificationEmailStatus.AlreadyVerified;

    const emailToken = await this.usersService.updateToken(
      user.email,
      "email-verification"
    );

    await this.sendWelcomeEmail(user.email, user.name, emailToken);

    return ResendVerificationEmailStatus.Success;
  }

  async resendVerificationEmailByToken(token: string) {
    const payload = emailVerificationTokenService.decode<{ email: string }>(
      token
    );

    const user = await this.usersService.findUnique(
      { email: payload?.email },
      { email: true, emailVerified: true, name: true }
    );

    if (!user) return ResendVerificationEmailStatus.NotFound;
    if (user.emailVerified)
      return ResendVerificationEmailStatus.AlreadyVerified;

    const emailToken = await this.usersService.updateToken(
      user.email,
      "email-verification"
    );

    await this.sendWelcomeEmail(user.email, user.name, emailToken);

    return ResendVerificationEmailStatus.Success;
  }

  async verifyEmailToken(
    token: string
  ): Promise<VerifyEmailTokenStatus | VerifyEmailTokenResponse> {
    try {
      const decodedToken = emailVerificationTokenService.verify<{
        email: string;
      }>(token);

      if (!decodedToken || !decodedToken?.email)
        return VerifyEmailTokenStatus.NotFound;

      const user = await this.usersService.findUnique(
        { email: decodedToken.email },
        { emailVerified: true, emailToken: true }
      );

      if (!user) return VerifyEmailTokenStatus.NotFound;
      if (user.emailVerified) return VerifyEmailTokenStatus.AlreadyVerified;

      const isTokensMatch = hashService.compare(token, user.emailToken!);

      if (!isTokensMatch) return VerifyEmailTokenStatus.Invalid;

      await this.usersService.verifyUserEmail(decodedToken.email);

      return VerifyEmailTokenStatus.Success;
    } catch (error) {
      const typedError = error as JWTError;

      if (typedError.message === "jwt expired")
        return VerifyEmailTokenStatus.Expired;

      return VerifyEmailTokenStatus.Invalid;
    }
  }

  async login(dto: LoginRequest) {
    const { email, password } = dto;
    const user = await this.usersService.getUserForLoginVerification(dto.email);

    if (!user) return LoginStatus.WrongCredentials;
    if (!user.emailVerified) return LoginStatus.EmailNotVerified;
    if (!user.isAcceptInvite) return LoginStatus.NotAcceptInvite;
    if (user.status === UserStatus.BLOCKED) return LoginStatus.Blocked;
    if (user.status === UserStatus.INACTIVE) return LoginStatus.Inactive;

    const isPasswordValid = await hashService.compare(password, user.password);

    if (!isPasswordValid) return LoginStatus.WrongCredentials;

    const { avatar, companyId, id, role } = user;

    return {
      email,
      id,
      role,
      avatar: avatar?.url,
      companyId: companyId || undefined,
    };
  }

  async resetPasswordRequest(dto: ResetPasswordRequestDto) {
    const { email } = dto;

    const user = await this.usersService.findUnique({ email }, { id: true });

    if (!user)
      throw new BadRequestException({
        message: "Invalid email",
        payload: ResetPasswordRequestError.InvalidEmail,
      });

    const resetToken = await this.usersService.updateToken(
      email,
      "reset-password"
    );

    await mailService.sendMail({
      to: email,
      templateKey: "resetPasswordTemplate",
      data: { token: resetToken },
    });

    return { success: true };
  }

  async verifyResetPasswordToken(dto: VerifyResetPasswordTokenRequest) {
    const { token } = dto;
    try {
      const decodedToken = passwordResetTokenService.verify<{ email: string }>(
        token
      );

      if (!decodedToken || !decodedToken?.email)
        throw new NotFoundException({
          message: "Token not found",
          payload: { type: VerifyResetPasswordTokenErrors.NotFound },
        });

      const user = await this.prismaService.user.findUnique({
        where: { email: decodedToken.email },
        select: { resetPasswordToken: true },
      });

      if (!user)
        throw new NotFoundException({
          message: "Not found",
          payload: { type: VerifyResetPasswordTokenErrors.NotFound },
        });
      if (!user.resetPasswordToken)
        throw new NotFoundException({
          message: "Token not found",
          payload: { type: VerifyResetPasswordTokenErrors.NotFound },
        });

      const isTokensMatch = hashService.compare(
        token,
        user.resetPasswordToken!
      );

      if (!isTokensMatch)
        throw new BadRequestException({
          message: "Invalid token",
          payload: { type: VerifyResetPasswordTokenErrors.TokenInvalid },
        });

      return decodedToken.email;
    } catch (error) {
      const typedError = error as JWTError;

      if (typedError instanceof TokenExpiredError) {
        const decoded = passwordResetTokenService.decode<{ email: string }>(
          token
        );

        if (!decoded || !decoded?.email)
          throw new BadRequestException({
            message: "Token not found",
            payload: { type: VerifyResetPasswordTokenErrors.NotFound },
          });

        throw new BadRequestException({
          message: "Token expired",
          payload: {
            type: VerifyResetPasswordTokenErrors.TokenExpired,
            email: decoded.email,
          },
        });
      }

      throw new BadRequestException({
        message: "Invalid token",
        payload: { type: VerifyResetPasswordTokenErrors.TokenInvalid },
      });
    }
  }

  async resetPassword(dto: ResetPasswordRequest & { userId?: string }) {
    const { password, token } = dto;

    const email = await this.verifyResetPasswordToken({ token });

    await this.usersService.resetPassword({ password, email });

    return { success: true };
  }
}
