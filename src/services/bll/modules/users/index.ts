import { JWTError } from "@/libs/jwt";
import { hashService } from "@/services/hash";
import { mailService } from "@/services/mail";
import {
  emailVerificationTokenService,
  inviteTokenService,
  passwordResetTokenService,
} from "@/services/token";
import {
  BadRequestException,
  FindManyPrismaEntity,
  NotFoundException,
} from "@/types";
import { daysToSeconds } from "@/utils/days-to-seconds";
import { Prisma, User, UserRoles, UserStatus } from "@prisma/client";
import {
  AbstractBllService,
  GetPaginationReturnType,
} from "../../module.abstract";
import {
  CustomerRegistrationRequest,
  LoginRequest,
  LoginStatus,
} from "../auth/schema";
import {
  AdminUsersRequest,
  ChangePasswordRequest,
  CheckEmailAvailableRequest,
  CompaniesUsersRequest,
  CompanyUsersRequest,
  CustomerUsersRequest,
  InviteUsersRequest,
  ResetPasswordRequest,
} from "./schema";
import { VerifyResetPasswordTokenRequest } from "./schema/verify-reset-password-token";

export class UsersBllModule extends AbstractBllService {
  protected async findMany(
    props: FindManyPrismaEntity<Prisma.UserWhereInput, Prisma.UserSelect>
  ) {
    const { limit, page, select, where } = props;
    let pagination: GetPaginationReturnType | null = null;

    const count = await this.prismaService.user.count({
      where,
    });

    pagination = this.getPagination({ count, limit, page });

    const data = await this.prismaService.user.findMany({
      where,
      skip: pagination?.skip ? pagination.skip : undefined,
      take: pagination?.take ? pagination.take : undefined,
      orderBy: { createdAt: "desc" },
      select,
    });

    return { data, meta: pagination?.meta };
  }

  async findUnique(
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect
  ) {
    const user = await this.prismaService.user.findUnique({
      where,
      select: select
        ? select
        : {
            id: true,
            email: true,
            name: true,
            emailVerified: true,
            emailToken: true,
            isAcceptInvite: true,
            status: true,
            companyId: true,
            role: true,
          },
    });

    return user;
  }

  async checkEmailAvailable(data: CheckEmailAvailableRequest) {
    if ("email" in data) {
      const user = await this.prismaService.user.findUnique({
        where: { email: data.email },
        select: { email: true, emailVerified: true },
      });

      return user;
    }

    const users = await this.prismaService.user.findMany({
      where: { email: { in: data.emails } },
      select: { email: true },
    });

    const emailsAvailable: Record<string, boolean> = {};

    data.emails.forEach((email) => {
      emailsAvailable[email] =
        !users.some((user) => user.email === email) ?? true;
    });

    return emailsAvailable;
  }

  async verifyEmailToken(email: string) {
    await this.prismaService.user.update({
      where: { email },
      data: { emailVerified: true },
    });
  }

  async inviteUsers(dto: InviteUsersRequest, companyId: string | null) {
    await this.prismaService.user.createMany({
      data: await Promise.all(
        dto.users.map(async (u) => {
          const inviteToken = inviteTokenService.generate({
            payload: { email: u.email },
            expiresIn: daysToSeconds(1),
          });

          return {
            ...u,
            emailToken: "",
            inviteToken,
            emailVerified: true,
            companyId,
          };
        })
      ),
    });

    const users = await this.prismaService.user.findMany({
      where: { email: { in: dto.users.map((u) => u.email) }, companyId },
      select: { email: true },
    });

    return { users };
  }

  async updateEmailToken(email: string) {
    const emailToken = emailVerificationTokenService.generate({
      payload: { email },
      expiresIn: daysToSeconds(1),
    });

    const updateResponse = await this.prismaService.user.update({
      where: { email },
      data: { emailToken },
      select: { id: true },
    });

    return { ...updateResponse, emailToken };
  }

  async registerCustomer(data: CustomerRegistrationRequest) {
    const { email, password, name } = data;

    const hashedPassword = await hashService.hash(password);
    const verificationToken = emailVerificationTokenService.generate({
      payload: { email },
      expiresIn: daysToSeconds(1),
    });

    const createResponse = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRoles.CUSTOMER,
        emailToken: await hashService.hash(verificationToken),
        isAcceptInvite: true,
        inviteToken: "",
      },
      select: { email: true, name: true },
    });

    return { ...createResponse, emailToken: verificationToken };
  }

  async verifyUserLogin(data: LoginRequest) {
    const { email, password } = data;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        emailVerified: true,
        isAcceptInvite: true,
        status: true,
        avatar: true,
        password: true,
        id: true,
        companyId: true,
        role: true,
      },
    });

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

  async inviteUser(data: {
    email: string;
    password: string;
    role?: UserRoles;
  }): Promise<Pick<User, "id" | "email" | "role">> {
    const { email, password, role } = data;

    const hashedPassword = await hashService.hash(password);
    const emailToken = emailVerificationTokenService.generate({
      payload: { email },
      expiresIn: daysToSeconds(1),
    });

    return await this.prismaService.user.create({
      data: { email, emailToken, password: hashedPassword, role },
      select: { id: true, email: true, role: true },
    });
  }

  async admin(dto: AdminUsersRequest) {
    const { limit = 10, page = 0, search = "", status } = dto;

    const where: Prisma.UserWhereInput = {
      OR: [{ role: UserRoles.ADMIN }, { role: UserRoles.SUB_ADMIN }],
    };

    if (search)
      where.AND = {
        AND: [
          {
            OR: [
              { email: { contains: search, mode: "insensitive" } },
              { name: { contains: search, mode: "insensitive" } },
            ],
          },
        ],
      };
    if (status) where.status = status;

    return this.findMany({
      limit,
      page,
      where,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: { select: { id: true, name: true, url: true } },
        role: true,
        status: true,
        isAcceptInvite: true,
      },
    });
  }

  async companyUsers(dto: CompaniesUsersRequest) {
    const { companyId, status, limit = 10, page = 0, search = "" } = dto;

    const where: Prisma.UserWhereInput = {
      OR: [
        { role: UserRoles.OWNER },
        { role: UserRoles.MODERATOR },
        { role: UserRoles.RECRUITER },
      ],
    };

    if (status) where.status = status;
    if (companyId) where.companyId = companyId;

    if (search) {
      where.AND = [
        {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            { company: { name: { contains: search, mode: "insensitive" } } },
          ],
        },
      ];
    }

    return await this.findMany({
      page,
      limit,
      where,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: { select: { id: true, name: true, url: true } },
        isAcceptInvite: true,
        status: true,
        role: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async company(dto: CompanyUsersRequest, companyId: string) {
    const { status, limit = 10, page = 0, search = "" } = dto;

    const where: Prisma.UserWhereInput = {
      companyId,
      OR: [
        { role: UserRoles.OWNER },
        { role: UserRoles.MODERATOR },
        { role: UserRoles.RECRUITER },
      ],
    };

    if (status) where.status = status;
    if (companyId) where.companyId = companyId;

    if (search) {
      where.AND = [
        {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            { company: { name: { contains: search, mode: "insensitive" } } },
          ],
        },
      ];
    }

    const response = await this.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: { select: { id: true, name: true, url: true } },
        isAcceptInvite: true,
        status: true,
        role: true,
      },
    });

    return response;
  }

  async customers(dto: CustomerUsersRequest) {
    const { limit = 10, page = 0, search = "" } = dto;

    const where: Prisma.UserWhereInput = {
      role: UserRoles.CUSTOMER,
    };

    if (search) {
      where.AND = [
        {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
          ],
        },
      ];
    }

    return await this.findMany({
      page,
      limit,
      where,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: { select: { id: true, name: true, url: true } },
        status: true,
        isAcceptInvite: true,
      },
    });
  }

  async resetPassword(dto: ResetPasswordRequest) {
    const { email } = dto;

    const user = await this.findUnique({ email }, { id: true });

    if (!user) throw new NotFoundException("User not found");

    const resetPasswordToken = passwordResetTokenService.generate({
      payload: { email },
      expiresIn: daysToSeconds(1),
    });

    await this.prismaService.user.update({
      where: { email },
      data: { resetPasswordToken: await hashService.hash(resetPasswordToken) },
    });

    await mailService.sendMail({
      to: email,
      templateKey: "resetPasswordTemplate",
      data: { token: resetPasswordToken },
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
        throw new NotFoundException("Token not found");

      const user = await this.prismaService.user.findUnique({
        where: { email: decodedToken.email },
        select: { resetPasswordToken: true },
      });

      if (!user) throw new NotFoundException("Not found");
      if (!user.resetPasswordToken)
        throw new NotFoundException("Token not found");

      const isTokensMatch = hashService.compare(
        token,
        user.resetPasswordToken!
      );

      if (!isTokensMatch) throw new BadRequestException("Invalid token");

      return decodedToken.email;
    } catch (error) {
      const typedError = error as JWTError;

      if (typedError.message === "jwt expired")
        throw new BadRequestException("Token expired");

      throw new BadRequestException("Invalid token");
    }
  }

  async changePassword(dto: ChangePasswordRequest & { userId?: string }) {
    const { userId, oldPassword, newPassword, token } = dto;
    let userIdToUpdate = userId || "";

    if (token) {
      const email = await this.verifyResetPasswordToken({ token });

      const user = await this.prismaService.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (!user) throw new NotFoundException("User not found");

      userIdToUpdate = user.id;
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userIdToUpdate },
      select: { password: true },
    });

    if (!user) throw new NotFoundException("User not found");

    const isPasswordValid = await hashService.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordValid) throw new BadRequestException("Invalid password");

    const hashedPassword = await hashService.hash(newPassword);

    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true };
  }
}
