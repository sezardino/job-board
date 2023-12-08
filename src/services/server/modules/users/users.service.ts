import { passwordService } from "@/services/password";
import { AbstractService } from "@/services/server/helpers";
import { Prisma, User, UserRoles } from "@prisma/client";
import {
  AdminUsersRequest,
  CompanyUsersRequest,
  CustomerUsersRequest,
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

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
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

    if (search) where.email = { contains: search, mode: "insensitive" };
    if (status) where.status = status;

    return this.findMany({
      limit,
      page,
      where,
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        isEmailVerified: true,
      },
    });
  }

  async company(dto: CompanyUsersRequest) {
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
    if (search) where.email = { contains: search, mode: "insensitive" };

    return await this.findMany({
      page,
      limit,
      where,
      select: {
        id: true,
        name: true,
        email: true,
        isEmailVerified: true,
        status: true,
        role: true,
        company: {
          select: {
            id: true,
            name: true,
            owner: { select: { name: true, email: true, id: true } },
          },
        },
      },
    });
  }

  async customers(dto: CustomerUsersRequest) {
    const { limit = 10, page = 0, search = "" } = dto;

    const where: Prisma.UserWhereInput = {
      role: UserRoles.CUSTOMER,
    };

    if (search) where.email = { contains: search, mode: "insensitive" };

    return await this.findMany({
      page,
      limit,
      where,
      select: { email: true, status: true, id: true, isEmailVerified: true },
    });
  }
}
