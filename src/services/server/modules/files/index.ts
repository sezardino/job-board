import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "@/services/server/helpers";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

export class FilesModule
  implements AbstractModule<FilesController, FilesService>
{
  controller: FilesController;
  service: FilesService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new FilesService(prismaService);
    this.controller = new FilesController(this.service);
  }
}
