import { PrismaService, prisma } from "@/libs/prisma";
import {
  AuthBllModule,
  CategoriesBllModule,
  CompaniesBllModule,
  FilesBllModule,
  IndustriesBllModule,
  NotesBllModule,
  OffersBllModule,
  StatisticsBllModule,
  UsersBllModule,
} from "./modules";
import { ApplicationsBllModule } from "./modules/application";

class BllService {
  auth: AuthBllModule;
  users: UsersBllModule;
  industries: IndustriesBllModule;
  companies: CompaniesBllModule;
  files: FilesBllModule;
  offers: OffersBllModule;
  categories: CategoriesBllModule;
  applications: ApplicationsBllModule;
  notes: NotesBllModule;
  statistics: StatisticsBllModule;

  constructor(private readonly prismaService: PrismaService) {
    this.files = new FilesBllModule(prismaService);
    this.users = new UsersBllModule(prismaService, this.files);
    this.companies = new CompaniesBllModule(prismaService, this.files);
    this.auth = new AuthBllModule(prismaService, this.users, this.companies);
    this.industries = new IndustriesBllModule(prismaService);
    this.offers = new OffersBllModule(prismaService);
    this.categories = new CategoriesBllModule(prismaService);
    this.applications = new ApplicationsBllModule(prismaService, this.files);
    this.notes = new NotesBllModule(prismaService, this.applications);
    this.statistics = new StatisticsBllModule(prismaService);
  }
}

export const bllService = new BllService(prisma);
