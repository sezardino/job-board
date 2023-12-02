import { PrismaService } from "@/libs/prisma";
import { AbstractModule } from "@/services/server/helpers";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

export class UsersModule
  implements AbstractModule<UsersController, UsersService>
{
  controller: UsersController;
  service: UsersService;

  constructor(private readonly prismaService: PrismaService) {
    this.service = new UsersService(prismaService);
    this.controller = new UsersController(this.service);
  }
}
