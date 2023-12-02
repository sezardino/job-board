import { PrismaService, prisma } from "@/libs/prisma";
import { AuthModule, IndustriesModule, UsersModule } from "./modules";

class Server {
  auth: AuthModule;
  users: UsersModule;
  industries: IndustriesModule;

  constructor(private readonly prismaService: PrismaService) {
    this.users = new UsersModule(prismaService);
    this.auth = new AuthModule(prismaService, this.users.service);
    this.industries = new IndustriesModule(prismaService);
  }
}

export const serverService = new Server(prisma);
