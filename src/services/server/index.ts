import { PrismaService, prisma } from "@/libs/prisma";
import {
  AuthModule,
  CategoriesModule,
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
  categories: CategoriesModule;

  constructor(private readonly prismaService: PrismaService) {
    this.files = new FilesModule(prismaService);
    this.users = new UsersModule(prismaService);
    this.companies = new CompaniesModule(prismaService, this.files.service);
    this.auth = new AuthModule(
      prismaService,
      this.users.service,
      this.companies.service
    );
    this.industries = new IndustriesModule(prismaService);
    this.jobOffers = new JobOffersModule(prismaService);
    this.categories = new CategoriesModule(prismaService);
  }
}

export const serverService = new Server(prisma);
