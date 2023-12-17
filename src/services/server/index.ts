import { PrismaService, prisma } from "@/libs/prisma";
import {
  AuthModule,
  CompaniesModule,
  FilesModule,
  IndustriesModule,
  JobOffersModule,
  UsersModule,
} from "./modules";

class Server {
  auth: AuthModule;
  users: UsersModule;
  industries: IndustriesModule;
  companies: CompaniesModule;
  files: FilesModule;
  jobOffers: JobOffersModule;

  constructor(private readonly prismaService: PrismaService) {
    this.users = new UsersModule(prismaService);
    this.auth = new AuthModule(prismaService, this.users.service);
    this.industries = new IndustriesModule(prismaService);
    this.files = new FilesModule(prismaService);
    this.companies = new CompaniesModule(prismaService, this.files.service);
    this.jobOffers = new JobOffersModule(prismaService);
  }
}

export const serverService = new Server(prisma);
