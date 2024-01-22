import { JWTError } from "@/libs/jwt";
import { PrismaService } from "@/libs/prisma";
import { mailService } from "@/services/mail";
import { passwordService } from "@/services/password";
import { AbstractService } from "@/services/server/helpers";
import { tokenService } from "@/services/token";
import { UserStatus } from "@prisma/client";
import { UsersService } from "../users/users.service";
import {
  CustomerRegistrationRequest,
  LoginRequest,
  LoginStatus,
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
    const neededUser = await this.usersService.findUserByEmailToken(token);

    if (!neededUser) return VerifyEmailTokenStatus.NotFound;
    if (neededUser.emailVerified) return VerifyEmailTokenStatus.AlreadyVerified;

    try {
      const decodedToken = tokenService.verify<{ email: string }>(
        token,
        neededUser.email
      );

      if (!decodedToken || decodedToken?.email !== neededUser.email)
        return VerifyEmailTokenStatus.NotFound;

      await this.usersService.verifyEmailToken(neededUser.email);

      return VerifyEmailTokenStatus.Success;
    } catch (error) {
      const typedError = error as JWTError;
      console.log(typedError);

      if (typedError.message === "jwt expired")
        return VerifyEmailTokenStatus.Expired;

      return VerifyEmailTokenStatus.Invalid;
    }
  }

  async login(dto: LoginRequest) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);

    if (!user) return LoginStatus.WrongCredentials;
    if (!user.emailVerified) return LoginStatus.EmailNotVerified;
    if (!user.isAcceptInvite) return LoginStatus.NotAcceptInvite;
    if (user.status === UserStatus.BLOCKED) return LoginStatus.Blocked;
    if (user.status === UserStatus.INACTIVE) return LoginStatus.Inactive;

    const isPasswordValid = await passwordService.compare(
      password,
      user.password
    );

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
}
