import { AbstractService } from "@/services/server/helpers";
import { User } from "@prisma/client";

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
}
