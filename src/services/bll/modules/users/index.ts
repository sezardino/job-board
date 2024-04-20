import { PrismaService } from "@/libs/prisma";
import { hashService } from "@/services/hash";
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
import { Prisma, User, UserRoles } from "@prisma/client";
import {
  AbstractBllService,
  GetPaginationReturnType,
} from "../../module.abstract";
import { CustomerRegistrationRequest } from "../auth/schema";
import { FilesBllModule } from "../files";
import {
  AdminUsersRequest,
  ChangePasswordRequest,
  CheckEmailAvailableRequest,
  CompaniesUsersRequest,
  CompanyUsersRequest,
  CustomerUsersRequest,
  EditUserProfileRequest,
  InviteUsersRequest,
} from "./schema";

export class UsersBllModule extends AbstractBllService {
  constructor(
    prismaService: PrismaService,
    private readonly filesService: FilesBllModule
  ) {
    super(prismaService);
  }

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

  currentProfile(userId: string) {
    const user = this.findUnique(
      { id: userId },
      {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: { select: { url: true } },
      }
    );

    if (!user) throw new NotFoundException("User not found");

    return user;
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

  async verifyUserEmail(email: string) {
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

  async updateToken(
    email: string,
    type: "email-verification" | "reset-password"
  ) {
    let token = "";

    if (type === "email-verification")
      token = emailVerificationTokenService.generate({
        payload: { email },
        expiresIn: daysToSeconds(1),
      });

    if (type === "reset-password")
      token = passwordResetTokenService.generate({
        payload: { email },
        expiresIn: daysToSeconds(1),
      });

    await this.prismaService.user.update({
      where: { email },
      data: {
        emailToken:
          type === "email-verification"
            ? await hashService.hash(token)
            : undefined,
        resetPasswordToken:
          type === "reset-password" ? await hashService.hash(token) : undefined,
      },
      select: { id: true },
    });

    return token;
  }

  async registerCustomer(data: CustomerRegistrationRequest) {
    const { email, password, name } = data;

    const hashedPassword = await hashService.hash(password);
    const verificationToken = emailVerificationTokenService.generate({
      payload: { email },
      expiresIn: daysToSeconds(1),
    });

    const newCustomer = await this.prismaService.user.create({
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

    return { ...newCustomer, emailToken: verificationToken };
  }

  async getUserForLoginVerification(email: string) {
    return await this.prismaService.user.findUnique({
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

  async changePassword(
    dto: ChangePasswordRequest & { userId?: string; email?: string }
  ) {
    const { userId, email, oldPassword, newPassword } = dto;

    if (!userId && !email)
      throw new BadRequestException("Email or userId is required");

    const user = await this.prismaService.user.findUnique({
      where: { id: userId ?? undefined, email: email ?? undefined },
      select: { password: true },
    });

    if (!user) throw new NotFoundException("User not found");

    const isPasswordMatch = await hashService.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordMatch) throw new BadRequestException("Invalid password");

    const hashedPassword = await hashService.hash(newPassword);

    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true };
  }

  async editProfile(dto: EditUserProfileRequest & { userId: string }) {
    const { avatar, name, userId } = dto;

    const isUserExist = await this.findUnique({ id: userId }, { id: true });

    if (!isUserExist) throw new NotFoundException("User not found");

    const data: Prisma.UserUpdateInput = {};

    if (name) data.name = name;
    if (avatar) {
      const image = await this.filesService.uploadImage({
        file: avatar,
        id: userId,
        type: "user-avatar",
      });

      if (image) {
        data.avatar = {
          connect: { id: image.id },
        };
      }
    }

    return await this.prismaService.user.update({
      where: { id: userId },
      data,
      select: { id: true },
    });
  }
}
