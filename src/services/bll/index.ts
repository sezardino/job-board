import { PrismaService, prisma } from "@/libs/prisma";
import {
  AuthBllModule,
  CategoriesBllModule,
  CompaniesBllModule,
  FilesBllModule,
  IndustriesBllModule,
  JobOffersBllModule,
  UsersBllModule,
} from "./modules";

class BllService {
  auth: AuthBllModule;
  users: UsersBllModule;
  industries: IndustriesBllModule;
  companies: CompaniesBllModule;
  files: FilesBllModule;
  jobOffers: JobOffersBllModule;
  categories: CategoriesBllModule;

  constructor(private readonly prismaService: PrismaService) {
    this.files = new FilesBllModule(prismaService);
    this.users = new UsersBllModule(prismaService);
    this.companies = new CompaniesBllModule(prismaService, this.files);
    this.auth = new AuthBllModule(prismaService, this.users, this.companies);
    this.industries = new IndustriesBllModule(prismaService);
    this.jobOffers = new JobOffersBllModule(prismaService);
    this.categories = new CategoriesBllModule(prismaService);
  }
}

export const bllService = new BllService(prisma);