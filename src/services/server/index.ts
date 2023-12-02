import { PrismaService, prisma } from "@/libs/prisma";
import { AuthModule, UsersModule } from "./modules";

class Server {
  auth: AuthModule;
  users: UsersModule;

  constructor(private readonly prismaService: PrismaService) {
    this.users = new UsersModule(prismaService);
    this.auth = new AuthModule(prismaService, this.users.service);
  }
}

export const serverService = new Server(prisma);
