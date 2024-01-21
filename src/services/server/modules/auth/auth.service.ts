import { PrismaService } from "@/libs/prisma";
import { mailService } from "@/services/mail";
import { passwordService } from "@/services/password";
import { AbstractService } from "@/services/server/helpers";
import { UserStatus } from "@prisma/client";
import { UsersService } from "../users/users.service";
import {
  CustomerRegistrationRequest,
  LoginRequest,
  LoginStatus,
  RegistrationStatus,
  VerifyEmailTokenStatus,
} from "./schema";
import { ResendVerificationEmailStatus } from "./schema/resend-verification-email";

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

  async resendVerificationEmail(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) return ResendVerificationEmailStatus.NotFound;
    if (user.emailVerified)
      return ResendVerificationEmailStatus.AlreadyVerified;

    await this.sendWelcomeEmail(email, user.name, user.emailToken);

    return ResendVerificationEmailStatus.Success;
  }

  async verifyEmailToken(token: string): Promise<VerifyEmailTokenStatus> {
    const neededUser = await this.usersService.findUserByEmailToken(token);

    if (!neededUser) return VerifyEmailTokenStatus.NotFound;

    if (neededUser.emailVerified) return VerifyEmailTokenStatus.AlreadyVerified;

    await this.usersService.verifyEmailToken(neededUser.email);

    return VerifyEmailTokenStatus.Success;
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
