import { JWTError } from "@/libs/jwt";
import { PrismaService } from "@/libs/prisma";
import { hashService } from "@/services/hash";
import { mailService } from "@/services/mail";
import { AbstractService } from "@/services/server/helpers";
import { emailVerificationTokenService } from "@/services/token";
import { UsersService } from "../users/users.service";
import {
  CustomerRegistrationRequest,
  LoginRequest,
  RegistrationStatus,
  VerifyEmailTokenResponse,
  VerifyEmailTokenStatus,
} from "./schema";
import {
  ResendVerificationEmailRequest,
  ResendVerificationEmailStatus,
} from "./schema/resend-verification-email";

export class AuthService extends AbstractService {
  constructor(
    prismaService: PrismaService,
    private readonly usersService: UsersService
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

    const user = await this.usersService.checkEmailAvailable(email);

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

  async resendVerificationEmail(data: ResendVerificationEmailRequest) {
    const user = await this.usersService.findUnique({
      email: "email" in data ? data.email : undefined,
      emailToken: "token" in data ? data.token : undefined,
    });

    if (!user) return ResendVerificationEmailStatus.NotFound;
    if (user.emailVerified)
      return ResendVerificationEmailStatus.AlreadyVerified;

    const { emailToken } = await this.usersService.updateEmailToken(user.email);

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

      const isTokensMatch = hashService.compare(token, user.emailToken);

      if (!isTokensMatch) return VerifyEmailTokenStatus.Invalid;

      await this.usersService.verifyEmailToken(decodedToken.email);

      return VerifyEmailTokenStatus.Success;
    } catch (error) {
      const typedError = error as JWTError;

      if (typedError.message === "jwt expired")
        return VerifyEmailTokenStatus.Expired;

      return VerifyEmailTokenStatus.Invalid;
    }
  }

  async login(dto: LoginRequest) {
    return this.usersService.verifyUserLogin(dto);
  }
}
