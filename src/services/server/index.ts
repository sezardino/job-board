import { PrismaService, prisma } from "@/libs/prisma";
import {
  AuthModule,
  CompaniesModule,
  IndustriesModule,
  UsersModule,
} from "./modules";

class Server {
  auth: AuthModule;
  users: UsersModule;
  industries: IndustriesModule;
  companies: CompaniesModule;

  constructor(private readonly prismaService: PrismaService) {
    this.users = new UsersModule(prismaService);
    this.auth = new AuthModule(prismaService, this.users.service);
    this.industries = new IndustriesModule(prismaService);
    this.companies = new CompaniesModule(prismaService);
  }
}

export const serverService = new Server(prisma);
