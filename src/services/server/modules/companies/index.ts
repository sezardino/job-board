import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "@/services/server/helpers";
import { FilesService } from "../files/files.service";
import { CompaniesController } from "./companies.controller";
import { CompaniesService } from "./companies.service";

export class CompaniesModule
  implements AbstractModule<CompaniesController, CompaniesService>
{
  controller: CompaniesController;
  service: CompaniesService;

  constructor(
    private readonly prismaService: PrismaService,
    filesService: FilesService
  ) {
    this.service = new CompaniesService(prismaService, filesService);
    this.controller = new CompaniesController(this.service);
  }
}
