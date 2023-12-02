import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "@/services/server/helpers";
import { CompaniesController } from "./companies.controller";
import { CompaniesService } from "./companies.service";

export class CompaniesModule
  implements AbstractModule<CompaniesController, CompaniesService>
{
  controller: CompaniesController;
  service: CompaniesService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new CompaniesService(prismaService);
    this.controller = new CompaniesController(this.service);
  }
}
