import { AbstractService } from "@/services/server/helpers";
import { Prisma, User, UserRoles } from "@prisma/client";
import { AdminsListRequest } from "./schema/admins-list";

export class UsersService extends AbstractService {
  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return !Boolean(user);
  }

  async findByEmail(
    email: string
  ): Promise<Pick<User, "id" | "email" | "password" | "role">> {
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

  async createUser(
    email: string,
    password: string
  ): Promise<Pick<User, "id" | "email" | "role">> {
    return await this.prismaService.user.create({
      data: { email, password },
      select: { id: true, email: true, role: true },
    });
  }

  async admins(dto: AdminsListRequest) {
    const { limit = 10, page = 0, search } = dto;

    const where: Prisma.UserWhereInput = {
      OR: [{ role: UserRoles.ADMIN }, { role: UserRoles.SUB_ADMIN }],
    };

    if (search) where.email = { contains: search, mode: "insensitive" };

    const count = await this.prismaService.user.count({ where });

    const { meta, skip, take } = this.getPagination({ page, limit, count });

    const admins = await this.prismaService.user.findMany({
      skip,
      take,
      where,
      select: {
        email: true,
        status: true,
        id: true,
        role: true,
      },
      orderBy: {
        email: "asc",
      },
    });

    return { admins, meta };
  }
}
