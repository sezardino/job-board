import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "@/services/server/helpers";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

export class CategoriesModule
  implements AbstractModule<CategoriesController, CategoriesService>
{
  controller: CategoriesController;
  service: CategoriesService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new CategoriesService(prismaService);
    this.controller = new CategoriesController(this.service);
  }
}
