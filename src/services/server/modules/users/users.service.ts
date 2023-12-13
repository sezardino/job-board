import { passwordService } from "@/services/password";
import { AbstractService } from "@/services/server/helpers";
import { Prisma, User, UserRoles } from "@prisma/client";
import {
  AdminUsersRequest,
  CompaniesUsersRequest,
  CompanyUsersRequest,
  CustomerUsersRequest,
  InviteUsersRequest,
} from "./schema";

type FindManyUsersArgs = {
  where: Prisma.UserWhereInput;
  select: Prisma.UserSelect;
  page: number;
  limit: number;
};

export class UsersService extends AbstractService {
  private async findMany(args: FindManyUsersArgs) {
    const { limit = 10, page = 0, select, where } = args;

    const count = await this.prismaService.user.count({ where });

    const { meta, skip, take } = this.getPagination({ page, limit, count });

    const users = await this.prismaService.user.findMany({
      where,
      select,
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { users, meta };
  }

  async checkEmailAvailable(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return !Boolean(user);
  }

  async checkEmailsAvailable(
    emails: string[]
  ): Promise<Record<string, boolean>> {
    const users = await this.prismaService.user.findMany({
      where: { email: { in: emails } },
      select: { email: true },
    });

    const emailsAvailable: Record<string, boolean> = {};

    emails.forEach((email) => {
      emailsAvailable[email] =
        !users.some((user) => user.email === email) ?? true;
    });

    return emailsAvailable;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        companyId: true,
        password: true,
        role: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  }

  async inviteUsers(dto: InviteUsersRequest, companyId: string | null) {
    await this.prismaService.user.createMany({
      data: dto.users.map((u) => ({ ...u, companyId })),
    });

    const users = await this.prismaService.user.findMany({
      where: { email: { in: dto.users.map((u) => u.email) }, companyId },
      select: { email: true },
    });

    return { users };
  }

  async createUser(data: {
    email: string;
    password: string;
    role?: UserRoles;
  }): Promise<Pick<User, "id" | "email" | "role">> {
    const { email, password, role } = data;

    const hashedPassword = await passwordService.hash(password);

    return await this.prismaService.user.create({
      data: { email, password: hashedPassword, role },
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
        role: true,
        status: true,
        isAcceptInvite: true,
      },
    });
  }

  async companies(dto: CompaniesUsersRequest) {
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

    return await this.findMany({
      page,
      limit,
      where,
      select: {
        id: true,
        name: true,
        email: true,
        isAcceptInvite: true,
        status: true,
        role: true,
      },
    });
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
        name: true,
        email: true,
        status: true,
        id: true,
        isAcceptInvite: true,
      },
    });
  }
}
