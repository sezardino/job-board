import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "@/services/server/helpers";
import { IndustriesController } from "./industries.controller";
import { IndustriesService } from "./industries.service";

export class IndustriesModule
  implements AbstractModule<IndustriesController, IndustriesService>
{
  controller: IndustriesController;
  service: IndustriesService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new IndustriesService(prismaService);
    this.controller = new IndustriesController(this.service);
  }
}
