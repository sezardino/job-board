import { JWTError } from "@/libs/jwt";
import { PrismaService } from "@/libs/prisma";
import { hashService } from "@/services/hash";
import { mailService } from "@/services/mail";
import { emailVerificationTokenService } from "@/services/token";
import { CompaniesBllModule, UsersBllModule } from "..";
import { AbstractBllService } from "../../module.abstract";
import {
  CustomerRegistrationRequest,
  LoginRequest,
  RegistrationStatus,
  VerifyEmailTokenResponse,
  VerifyEmailTokenStatus,
} from "./schema";
import {
  CompanyRegistrationRequest,
  CompanyRegistrationStatus,
} from "./schema/company-registration";
import { ResendVerificationEmailStatus } from "./schema/resend-verification-email";

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

    const { emailToken } = await this.usersService.updateEmailToken(user.email);

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

      const isTokensMatch = hashService.compare(token, user.emailToken!);

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
