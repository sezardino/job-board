import { PrismaService } from "@/libs/prisma";
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
  NotAllowedException,
  NotFoundException,
} from "@/types";
import { daysToSeconds } from "@/utils/days-to-seconds";
import { Prisma, UserRoles } from "@prisma/client";
import email from "next-auth/providers/email";
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

const inviteAllowedRoles = [UserRoles.OWNER, UserRoles.ADMIN];

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

  protected async sendInviteMail(
    type: "admin" | "company",
    user: { email: string; token: string },
    inviter: { name: string; company?: { name: string } | null }
  ) {
    switch (type) {
      case "admin":
        await mailService.sendMail({
          templateKey: "inviteAdminTemplate",
          to: user.email,
          data: {
            token: user.token,
            inviterName: inviter.name,
          },
        });
        break;
      case "company":
        await mailService.sendMail({
          templateKey: "inviteToCompanyTemplate",
          to: user.email,
          data: {
            token: user.token,
            companyName: inviter.company?.name!,
            inviterName: inviter.name,
          },
        });
        break;
    }
  }

  async invite(dto: InviteUsersRequest & { inviterId: string }) {
    const { inviterId, users } = dto;
    const invitedUsers: { email: string; success: boolean }[] = [];

    const inviter = await this.prismaService.user.findUnique({
      where: { id: inviterId },
      select: {
        name: true,
        role: true,
        company: { select: { name: true, id: true } },
      },
    });

    if (!inviter) throw new NotFoundException("User not found");
    const type = inviter?.company ? "company" : "admin";
    const canInvite = inviteAllowedRoles.some((r) => r === inviter.role);
    const hasSubAdminRole = users.some((u) => u.role === UserRoles.SUB_ADMIN);
    const hasCompanyRole = users.some(
      (u) => u.role === UserRoles.MODERATOR || u.role === UserRoles.RECRUITER
    );

    if (!canInvite) throw new NotAllowedException("Not allowed");
    if (!inviter.company && type === "company")
      throw new NotAllowedException("Not allowed");
    if (hasSubAdminRole && inviter.role === UserRoles.OWNER)
      throw new NotAllowedException("Not allowed");
    if (hasCompanyRole && inviter.role === UserRoles.ADMIN)
      throw new NotAllowedException("Not allowed");

    users.forEach(async (u) => {
      try {
        const isUserExist = await this.checkEmailAvailable({ email: u.email });

        if (isUserExist) throw new BadRequestException("User already exist");

        const inviteToken = inviteTokenService.generate({
          payload: { email: u.email },
          expiresIn: daysToSeconds(1),
        });

        await this.prismaService.user.create({
          data: {
            email: u.email,
            role: u.role,
            inviteToken: await hashService.hash(inviteToken),
            companyId: inviter?.company?.id,
          },
        });

        await this.sendInviteMail(
          type,
          { email: u.email, token: inviteToken },
          inviter
        );

        invitedUsers.push({ email: u.email, success: true });
      } catch (error) {
        invitedUsers.push({ email: u.email, success: false });
      }
    });

    return { users: invitedUsers };
  }

  async cancelInvite(dto: { inviteId: string; userId: string }) {
    const { inviteId, userId } = dto;

    const users = await this.prismaService.user.findMany({
      where: { id: { in: [inviteId, userId] } },
      select: { id: true, companyId: true, role: true, isAcceptInvite: true },
    });

    const invitedUser = users.find((u) => u.id === inviteId);
    const canceler = users.find((u) => u.id === userId);

    if (!invitedUser || !canceler)
      throw new NotFoundException("User not found");

    const canCancelInvite = inviteAllowedRoles.some((r) => r === canceler.role);

    if (!canCancelInvite) throw new BadRequestException("Method not allowed");

    if (invitedUser.companyId !== canceler.companyId)
      throw new NotFoundException("User not found");

    if (invitedUser?.isAcceptInvite)
      throw new BadRequestException("User already accepted invite");

    await this.prismaService.user.delete({ where: { id: inviteId } });

    return { success: true };
  }

  async resendInvite(dto: { inviteId: string; userId: string }) {
    const { inviteId, userId } = dto;

    const users = await this.prismaService.user.findMany({
      where: { id: { in: [inviteId, userId] } },
      select: { id: true, companyId: true, role: true, isAcceptInvite: true },
    });

    const invitedUser = users.find((u) => u.id === inviteId);
    const user = users.find((u) => u.id === userId);

    if (!invitedUser || !user) throw new NotFoundException("User not found");

    if (invitedUser.isAcceptInvite)
      throw new BadRequestException("User already accepted invite");
  }

  async updateToken(
    email: string,
    type: "email-verification" | "reset-password" | "invite"
  ) {
    let token = "";
    const tokenConfiguration = {
      payload: { email },
      expiresIn: daysToSeconds(1),
    };

    switch (type) {
      case "email-verification":
        token = emailVerificationTokenService.generate(tokenConfiguration);
        break;
      case "reset-password":
        token = passwordResetTokenService.generate(tokenConfiguration);
        break;
      case "invite":
        token = inviteTokenService.generate(tokenConfiguration);
        break;
      default:
        throw new BadRequestException("Invalid token type");
    }

    const hashedToken = await hashService.hash(token);
    const dataToUpdate: Prisma.UserUpdateInput = {};

    switch (type) {
      case "email-verification":
        dataToUpdate.emailToken = hashedToken;
        break;
      case "reset-password":
        dataToUpdate.resetPasswordToken = hashedToken;
        break;
      case "invite":
        dataToUpdate.inviteToken = hashedToken;
        break;
    }

    await this.prismaService.user.update({
      where: { email },
      data: dataToUpdate,
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

  async changePassword(dto: ChangePasswordRequest & { userId: string }) {
    const { userId, oldPassword, newPassword } = dto;

    if (!userId && !email)
      throw new BadRequestException("Email or userId is required");

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
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

  async resetPassword(dto: { password: string; email: string }) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) throw new NotFoundException("User not found");

    const hashedPassword = await hashService.hash(password);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: true };
  }

  async editProfile(dto: EditUserProfileRequest & { userId: string }) {
    const { avatar, name, userId } = dto;

    const user = await this.findUnique(
      { id: userId },
      { id: true, avatar: { select: { id: true } } }
    );

    if (!user) throw new NotFoundException("User not found");

    const data: Prisma.UserUpdateInput = {};

    if (name) data.name = name;
    if (typeof avatar === "string" && avatar === "null" && user.avatar?.id) {
      await this.filesService.deleteFile({
        type: "user-avatar",
        id: user.avatar?.id,
      });

      data.avatar = { disconnect: true };
    }
    if (avatar && avatar !== "null" && avatar instanceof File) {
      const image = await this.filesService.uploadImage({
        file: avatar,
        id: userId,
        type: "user-avatar",
        idToDelete: user.avatar?.id,
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
